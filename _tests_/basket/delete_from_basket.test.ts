import db from "../../DB/db";
import delete_from_basket from "../../services/basket/controller/delete_from_basket";

describe("/delete_from_basket", () => {
  it("unAuthorized request", async () => {
    let response = await delete_from_basket({}, "1");
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    let response = await delete_from_basket({ id: 1 }, "1");
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await delete_from_basket({ id: 1 }, "1");
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
