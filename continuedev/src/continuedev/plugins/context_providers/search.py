import os
from typing import List
from ripgrepy import Ripgrepy

from .util import remove_meilisearch_disallowed_chars
from ...core.main import ContextItem, ContextItemDescription, ContextItemId
from ...core.context import ContextProvider


class SearchContextProvider(ContextProvider):
    title = "search"

    SEARCH_CONTEXT_ITEM_ID = "search"

    workspace_dir: str = None

    @property
    def BASE_CONTEXT_ITEM(self):
        return ContextItem(
            content="",
            description=ContextItemDescription(
                name="Search",
                description="Search the workspace for all matches of an exact string (e.g. '@search console.log')",
                id=ContextItemId(
                    provider_title=self.title,
                    item_id=self.SEARCH_CONTEXT_ITEM_ID
                )
            )
        )

    def _get_rg_path(self):
        if os.name == 'nt':
            rg_path = f"C:\\Users\\{os.getlogin()}\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\node_modules.asar.unpacked\\vscode-ripgrep\\bin\\rg.exe"
        elif os.name == 'posix':
            if 'darwin' in os.sys.platform:
                rg_path = "/Applications/Visual Studio Code.app/Contents/Resources/app/node_modules.asar.unpacked/@vscode/ripgrep/bin/rg"
            else:
                rg_path = "/usr/share/code/resources/app/node_modules.asar.unpacked/vscode-ripgrep/bin/rg"
        else:
            rg_path = "rg"

        if not os.path.exists(rg_path):
            rg_path = "rg"

        return rg_path

    async def _search(self, query: str) -> str:
        rg = Ripgrepy(query, self.workspace_dir, rg_path=self._get_rg_path())
        results = rg.I().context(2).run()
        return f"Search results in workspace for '{query}':\n\n{results}"

        # Custom display below - TODO

        # Gather results per file
        file_to_matches = {}
        for result in results:
            if result["type"] == "match":
                data = result["data"]
                filepath = data["path"]["text"]
                if filepath not in file_to_matches:
                    file_to_matches[filepath] = []

                line_num_and_line = f"{data['line_number']}: {data['lines']['text']}"
                file_to_matches[filepath].append(line_num_and_line)

        # Format results
        content = f"Search results in workspace for '{query}':\n\n"
        for filepath, matches in file_to_matches.items():
            content += f"{filepath}\n"
            for match in matches:
                content += f"{match}\n"
            content += "\n"

        return content

    async def provide_context_items(self, workspace_dir: str) -> List[ContextItem]:
        self.workspace_dir = workspace_dir
        return [self.BASE_CONTEXT_ITEM]

    async def get_item(self, id: ContextItemId, query: str) -> ContextItem:
        if not id.item_id == self.SEARCH_CONTEXT_ITEM_ID:
            raise Exception("Invalid item id")

        query = query.lstrip("search ")
        results = await self._search(query)

        ctx_item = self.BASE_CONTEXT_ITEM.copy()
        ctx_item.content = results
        ctx_item.description.name = f"Search: '{query}'"
        ctx_item.description.id.item_id = remove_meilisearch_disallowed_chars(
            query)
        return ctx_item
