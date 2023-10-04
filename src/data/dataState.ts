export const dataState: DataStateType = {
    pages:
        [
            {
                heading: "Цикл while",
                about: " Цикл while имеет следующий синтаксис: ",
            },//0
            {
                heading: "Цикл for",
                about: " Цикл for имеет следующий синтаксис: ",
            },//1
            {
                heading: "Конструкция \"switch\"",
                about: " Конструкция switch заменяет собой сразу несколько if.",
            },
        ],
}

export type DataStateType = {
    pages: Array<PagesType>
}

export type PagesType = {
    heading: string
    about: string
}
