/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type FullState = FullState1;
export type Name = string;
export type Hide = boolean;
export type Description = string;
export type SystemMessage = string;
export type Role = "assistant" | "user" | "system" | "function";
export type Content = string;
export type Name1 = string;
export type Summary = string;
export type Name2 = string;
export type Arguments = string;
export type ChatContext = ChatMessage[];
export type ManageOwnChatContext = boolean;
export type Depth = number;
export type Deleted = boolean;
export type Active = boolean;
export type Logs = string[];
export type Timeline = HistoryNode[];
export type CurrentIndex = number;
export type Active1 = boolean;
export type UserInputQueue = string[];
export type Name3 = string;
export type Description1 = string;
export type SlashCommands = SlashCommandDescription[];
export type AddingHighlightedCode = boolean;
export type Name4 = string;
export type Description2 = string;
export type ProviderTitle = string;
export type ItemId = string;
export type Content1 = string;
export type Editing = boolean;
export type Editable = boolean;
export type SelectedContextItems = ContextItem[];
export type SessionId = string;
export type Title = string;
export type DateCreated = string;

/**
 * A full state of the program, including the history
 */
export interface FullState1 {
  history: History;
  active: Active1;
  user_input_queue: UserInputQueue;
  slash_commands: SlashCommands;
  adding_highlighted_code: AddingHighlightedCode;
  selected_context_items: SelectedContextItems;
  session_info?: SessionInfo;
  [k: string]: unknown;
}
/**
 * A history of steps taken and their results
 */
export interface History {
  timeline: Timeline;
  current_index: CurrentIndex;
  [k: string]: unknown;
}
/**
 * A point in history, a list of which make up History
 */
export interface HistoryNode {
  step: Step;
  observation?: Observation;
  depth: Depth;
  deleted?: Deleted;
  active?: Active;
  logs?: Logs;
  [k: string]: unknown;
}
export interface Step {
  name?: Name;
  hide?: Hide;
  description?: Description;
  system_message?: SystemMessage;
  chat_context?: ChatContext;
  manage_own_chat_context?: ManageOwnChatContext;
  [k: string]: unknown;
}
export interface ChatMessage {
  role: Role;
  content?: Content;
  name?: Name1;
  summary: Summary;
  function_call?: FunctionCall;
  [k: string]: unknown;
}
export interface FunctionCall {
  name: Name2;
  arguments: Arguments;
  [k: string]: unknown;
}
export interface Observation {
  [k: string]: unknown;
}
export interface SlashCommandDescription {
  name: Name3;
  description: Description1;
  [k: string]: unknown;
}
/**
 * A ContextItem is a single item that is stored in the ContextManager.
 */
export interface ContextItem {
  description: ContextItemDescription;
  content: Content1;
  editing?: Editing;
  editable?: Editable;
  [k: string]: unknown;
}
/**
 * A ContextItemDescription is a description of a ContextItem that is displayed to the user when they type '@'.
 *
 * The id can be used to retrieve the ContextItem from the ContextManager.
 */
export interface ContextItemDescription {
  name: Name4;
  description: Description2;
  id: ContextItemId;
  [k: string]: unknown;
}
/**
 * A ContextItemId is a unique identifier for a ContextItem.
 */
export interface ContextItemId {
  provider_title: ProviderTitle;
  item_id: ItemId;
  [k: string]: unknown;
}
export interface SessionInfo {
  session_id: SessionId;
  title: Title;
  date_created: DateCreated;
  [k: string]: unknown;
}
