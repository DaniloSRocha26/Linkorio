//Importei o Router do express
//O Router vai servir para agrupar rotas
//em módulos separados, ao invés de ficar tudo no
//index.js, cada arquivo pode ter seu próprio
//router organizado
//No Index eu só vou precisar usar os app.use('/', )

//Por exemplo - categoriaRoutes.js
//router.get('/', ...)
//router.post('/', ...)

//Em outro arquivo seria a mesma coisa

//E no index eu só usaria app.use('/categoria', categoriaRoutes)
//ou app.use('/exemplo', exemploRoutes)
import { Router } from "express"

//importei a função getAllCategorias do categoriaController.js
import { getAllCategorias } from "../controllers/categoriaController.js"

//Criei o router
const router = Router()

//Defini a primeira rota do Router
router.get('/', getAllCategorias)

export default router