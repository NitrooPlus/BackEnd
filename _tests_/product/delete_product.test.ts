import db from "../../DB/db";
import delete_product from "../../services/product/controller/delete_product";

describe("/delete_product", () => {
  it("unAuthorized request", async () => {
    let response = await delete_product("", {}, "");
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Bad request", async () => {
    let response = await delete_product("", { id: 1 }, "");
    expect(response).toEqual({
      status: 400,
      content: "نام غرفه و محصول باید مشخص باشد",
    });
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([[{ id: 1 }]]);
    let response = await delete_product(
      "correct value",
      { id: 1 },
      "correct value"
    );
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await delete_product(
      "correct value",
      { id: 1 },
      "correct value"
    );
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
