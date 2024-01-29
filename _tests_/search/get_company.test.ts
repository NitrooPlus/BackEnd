import db from "../../DB/db";
import search_company from "../../services/search/controller/get_company";

describe("/search_company", () => {
  it("Correct request", async () => {
    db.query = jest.fn().mockResolvedValue([[1]]);
    const response = await search_company("correct value", 0, 0);
    expect(response).toEqual({ status: 200, content: [1] });
  });
  it("Internal error", async () => {
    db.query = jest.fn().mockRejectedValue(new Error());
    const response = await search_company("wrong value", 1, 1);
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
