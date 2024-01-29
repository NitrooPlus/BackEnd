import db from "../../DB/db";
import search_product from "../../services/search/controller/get_product";

describe("/search_product", () => {
  it("Correct request", async () => {
    db.query = jest.fn().mockResolvedValue([[1]]);
    const response = await search_product("correct value", 0, 0);
    expect(response).toEqual({ status: 200, content: [1] });
  });
  it("Internal error", async () => {
    db.query = jest.fn().mockRejectedValue(new Error());
    const response = await search_product("wrong value", 1, 1);
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
