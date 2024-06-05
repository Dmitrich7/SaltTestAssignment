import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";

interface slideData{
    date: number;
    content: string;
}

type mockData = {
    label: string;
    data: slideData[];
}

interface DotState{
    current: number;
    currentDateStart: number;
    currentDateEnd: number;
    wheelRotation: number;
    mockData: mockData[];
}

const initialState: DotState = {
    current: 0,
    wheelRotation: -300,
    mockData: [
        {
            label: "Label 1",
            data: [
                {
                    date: 1989,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa aaa a aa aaaaa aaa aaaaa aaaaaa aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
                {
                    date: 1990,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 1991,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 1992,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 1993,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
            ]
        },{
        label:"Кино",
            data: [
                {
                    date: 1994,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
                {
                    date: 1995,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 1996,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 1997,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 1998,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
            ]
        },{
        label:"Литература",
            data: [
                {
                    date: 1999,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
                {
                    date: 2000,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2001,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2002,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2003,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
            ]
        },{
            label:"Кино",
            data: [
                {
                    date: 2004,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
                {
                    date: 2005,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2006,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2007,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2008,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
            ]
        },{
            label:"Label 5",
            data: [
                {
                    date: 2009,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
                {
                    date: 2010,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2011,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2012,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2013,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
            ]
        },{
            label:"Наука",
            data: [
                {
                    date: 2014,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
                {
                    date: 2015,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2016,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2017,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },{
                    date: 2018,
                    content: "aaa a aa aaaaa aaa aaaaa aaaaaa"
                },
            ]
        }
    ],
    currentDateStart: 1989,
    currentDateEnd: 1992
}

export const DotSlice = createSlice({
    name: 'dot',
    initialState: initialState,
    reducers: {
        nextSlide(state){
            state.current+=1;
        },
        prevSlide(state){
            state.current-=1;
        },
        calculateRotation(state,action: PayloadAction<number>){
            state.wheelRotation = state.wheelRotation + (360/state.mockData.length*(state.current-action.payload))
            state.current = action.payload;
        },
        setCurrentDates(state,action: PayloadAction<number>){
            let lastElement = state.mockData[state.current].data.length - 1
            state.currentDateStart = state.mockData[action.payload].data[0].date
            state.currentDateEnd = state.mockData[state.current].data[lastElement].date
        }
    }
});

export default DotSlice.reducer;
