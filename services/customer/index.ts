import { Request, Response, NextFunction, Router } from 'express'
import get_customer from './controller/get_customer'
import edit_customer from './controller/edit_customer'
import delete_customer from './controller/delete_customer'


const router = Router()


router.get('/get_customer', async (req: Request, res: Response, next: NextFunction) => {

    let request: any = req.query

    let data = await get_customer(request.user)

    res.status(data.status).json(data.content);

})

router.post('/edit_customer', async (req: Request, res: Response, next: NextFunction) => {
    let request: any = req.query

    let data = await edit_customer(req.body, request.user)

    res.status(data.status).json(data.content)

})

router.delete('/delete_customer', async (req: Request, res: Response, next: NextFunction) => {

    let request: any = req.query

    let data = await delete_customer(req.url, request.user)

    res.status(200).json({});

})



export default router