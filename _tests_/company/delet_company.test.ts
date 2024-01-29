import db from "../../DB/db";
import delete_company from "../../services/company/controller/delete_company";

describe("/delete_company", () => {
  it("unAuthorized request", async () => {
    let response = await delete_company("", {});
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Bad request", async () => {
    let response = await delete_company("", { id: 1 });
    expect(response).toEqual({
      status: 400,
      content: "نام غرفه باید مشخص باشد",
    });
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    let response = await delete_company("correct value", { id: 1 });
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await delete_company("correct value", { id: 1 });
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
