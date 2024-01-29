import db from "../../DB/db";
import add_to_basket from "../../services/basket/controller/add_to_basket";

describe("/add_to_basket", () => {
  it("unAuthorized request", async () => {
    let response = await add_to_basket({}, "1");
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Bad request", async () => {
    let response = await add_to_basket({ id: 1 }, "");
    expect(response.status).toBe(400);
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    let response = await add_to_basket({ id: 1 }, "1");
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await add_to_basket({ id: 1 }, "1");
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
