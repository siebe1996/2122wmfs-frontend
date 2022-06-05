/**
 * @author Van de Voorde Siebe
 * @Version 5-6-2022
 */
import { describe, expect, test } from "vitest";
import router from "./index";

describe("page title", () => {
  test("every route has a title value", () =>
    expect(router.getRoutes().every((r) => !!r.meta?.title)).toBe(true));
});
