import db from "../../DB/db";
import get_basket_list from "../../services/basket/controller/get_basket_list";

describe("/get_basket_list", () => {
  it("unAuthorized request", async () => {
    let response = await get_basket_list({});
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    let response = await get_basket_list({ id: 1 });
    expect(response).toEqual({
      status: 200,
      content: [],
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await get_basket_list({ id: 1 });
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
