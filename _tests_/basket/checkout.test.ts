import db from "../../DB/db";
import check_out from "../../services/basket/controller/checkout";

describe("/checkout", () => {
  it("unAuthorized request", async () => {
    let response = await check_out({}, []);
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });
  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    let response = await check_out({ id: 1 }, []);
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await check_out({ id: 1 }, []);
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
