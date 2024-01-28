import socket from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { check_auth } from "../../helper/check_auth";
import db from "../../DB/db";

const save_msg = (from: string, to: string, text: string) => {
  try {
    db.execute(`INSERT INTO chat (sender,reciver,text)
  VALUES('${from}','${to}','${text}')`);
  } catch (e) {}
};

export function chat_server(io: socket.Server<DefaultEventsMap, any>) {
  io.on("connection", async (socket) => {
    console.log(socket.id, socket.handshake.headers.authorization);
    const result: any = await check_auth(
      socket.handshake.headers.authorization,
      async (dec) => {
        return true;
      }
    );

    if (result.status == 200 && result?.decoded?.id) {
      const users: any[] = await db.execute(
        `SELECT for_user as id , json_arrayagg(url) as company_arr FROM test.company
        where for_user=${result?.decoded?.id}
        group by for_user;`
      );

      if (users?.[0]?.[0]) socket.data.user = users[0][0];
    }
    if (socket.data?.user || result?.decoded?.id) {
      console.log(`socket join => ${result.decoded.id}`);
      socket.join(result?.decoded?.id);
      socket.data.user?.company_arr?.forEach((element: string) => {
        console.log(`socket join => ${element}`);
        socket.join(element);
      });
      socket.on("message", (msg) => {
        let form = result.decoded.id;
        if (msg.from && socket.data.user.company_arr) {
          if (socket.data.user.company_arr.includes(msg.from)) form = msg.from;
        }
        if (msg.to) {
          console.log("message : " + msg);
          save_msg(form, msg.to, msg.text);
          io.to(msg.to).emit("message", { ...msg, from: form });
        }
      });
    } else {
      socket.disconnect();
    }
  });
}
