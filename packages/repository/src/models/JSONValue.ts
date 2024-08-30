export type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
export interface JSONArray extends Array<JSONValue> {}
export interface JSONObject {
  [key: string]: JSONValue;
}