import db from "../../DB/db";
import get_product from "../../services/product/controller/get_product";

describe("/get_product", () => {
  it("Bad request", async () => {
    let response = await get_product("", "");
    expect(response).toEqual({
      status: 400,
      content: { message: "نام غرفه و محصول باید مشخص باشد" },
    });
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([[1]]);
    const response = await get_product("correct value", "correct value");
    expect(response).toEqual({ status: 200, content: 1 });
  });

  it("Not found", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    const response = await get_product("correct value", "correct value");
    expect(response).toEqual({
      status: 404,
      content: { message: "محصول یافت نشد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    const response = await get_product("wrong value", "wrong value");
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
