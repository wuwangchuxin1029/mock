let Mock = require("mockjs")
let fs = require("fs")
let {Random} =Mock
let arr=["热销","套餐类","烧饼类","进店必买","酱肉类","凉菜类","汤类","饮料"];
Random.extend({
    mealType:()=>{
        let item = Random.pick(arr)
        let ind = arr.indexOf(item)
        let repeat = arr.splice(ind,1)
        console.log(repeat)
        return item
    }
})


let res = Mock.mock({
    "success":1,
    "info":"请求成功",
    "code":1001,
    "list|8":[
        {
            "title":()=>Random.mealType(),
            "meallist|2-5":[
                {
                    "name":()=>Random.cword(2,5),
                    "num":()=>Random.natural(1,9999),
                    "price":()=>Random.natural(1,99),
                    "img":Random.image("10×10",Random.color(),"#FFF","png","!")
                }
            ]
        }
    ]
})

fs.writeFileSync("meal.json",JSON.stringify(res))