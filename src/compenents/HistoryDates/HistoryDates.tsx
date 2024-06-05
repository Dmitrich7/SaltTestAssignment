import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Wheel from "../Wheel/Wheel";
import Counter from "../Counter/Counter";
import classes from "./HistoryDates.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from "swiper/modules";
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SlideContent from "../SwiperContent/SlideContent";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {gsap} from "gsap";
import SwiperButton from "../SwiperButton/SwiperButton";
import SwiperClass from 'swiper/types/swiper-class';
import {DotSlice} from "../../store/reducers/DotSlice";
import NavButton from "../NavButton/NavButton";
import {BrowserView} from 'react-device-detect';

const HistoryDates = () => {
    const [disableButton,setDisableButton] = useState('isBeginning');
    const [swiperInstance,setSwiperInstance] = useState<SwiperClass>();

    const {mockData,current,currentDateStart,currentDateEnd} = useAppSelector(state => state.dotReducer);
    const {calculateRotation,setCurrentDates} = DotSlice.actions;
    const dispatch = useAppDispatch();

    const sliderRef = useRef(null);

    const timeline = useRef<GSAPTimeline>(
        gsap.timeline({
            defaults: {
                ease: 'power1.out',
            },
        })
    )
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            timeline.current.from(sliderRef.current, {
                opacity: 1,
                ease: 'power1.out'
            }).to(sliderRef.current, {
                opacity: 0,
                ease: 'power1.out',
                duration: 0.2
            }).to(sliderRef.current, {
                opacity: 1,
                ease: 'power1.out',
                delay: 0.8,
                duration: 0.3
            })
        });
        return () => ctx.revert();
    },[current]);

    const handlePrev = ()=>{
        swiperInstance?.slidePrev()
    }
    const handleNext = ()=>{
        swiperInstance?.slideNext()
    }
    const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) =>{
        switch (e.currentTarget.id){
            case("prevButton"):{
                dispatch(calculateRotation(current-1))
                dispatch(setCurrentDates(current-1))
                break;
            }
            case("nextButton"):{
                dispatch(calculateRotation(current+1))
                dispatch(setCurrentDates(current+1))
                break;
            }
        }
    }

    return (
        <div className={classes.border}>
            <div className={classes.wrapper}>
                <div className={classes.dates}>
                    <div>Исторические</div>
                    <div>даты</div>
                </div>
                <div className={classes.wheel}>
                    <BrowserView>
                        <Wheel/>
                    </BrowserView>
                </div>
                <div className={classes.counter}>
                    <div className={classes.leftCounter}>
                        <Counter style={{color: "#5d60ef"}}  start={currentDateStart} delay={0.5}/>
                    </div>
                    <div className={classes.rightCounter}>
                        <Counter style={{color: "#ed5ea7"}}  start={currentDateEnd} delay={0.5}/>
                    </div>
                </div>
                <div className={classes.vertical}>
                    <hr />
                </div>
                <div className={classes.horizontal}>
                    <hr />
                </div>
                <div className={classes.navContainer}>
                    <div>0{current+1}/0{mockData.length}</div>
                    <div className={classes.navButtonGroup}>
                        <div style={{opacity:`${current===0?0.5:1}`,transform: "rotate(180deg)"}} className={classes.navButton}>
                            <NavButton disabled={current===0} id="prevButton" onClick={(e)=>handleNavigation(e)}/>
                        </div>
                        <div style={{opacity:`${current===mockData.length-1?0.5:1}`}} className={classes.navButton}>
                            <NavButton disabled={current===mockData.length-1} id="nextButton" onClick={(e)=>handleNavigation(e)}/>
                        </div>
                    </div>
                </div>
                <div ref={sliderRef} className={classes.parentSwiper}>
                    <div className={classes.swiperContainer}>
                        <div className={classes.buttonContainer}>
                            {disableButton=="isBeginning"?null:<SwiperButton
                                style={{transform: "rotate(180deg) translate(15%,-5%) scaleY(50%)"}}
                                onClick={handlePrev}
                            ></SwiperButton>}
                        </div>
                        <Swiper
                            modules={[Navigation,Pagination]}
                            grabCursor
                            slidesPerView={1.2}
                            pagination={true}
                            onSwiper={setSwiperInstance}
                            spaceBetween={10}
                            onActiveIndexChange={(e: SwiperClass) => {
                                if(e.isBeginning){
                                    setDisableButton("isBeginning");
                                } else if(e.isEnd){
                                    setDisableButton("isEnd");
                                }else{
                                    setDisableButton("");
                                }
                            }}
                            breakpoints={{
                                425: {
                                        slidesPerView: 4,
                                        pagination: false,
                                     },
                                }
                            }
                        >
                            {mockData[current].data.map((e,index)=>{
                                return(
                                    <SwiperSlide key={index} className={classes.swiperSlide}>
                                        <SlideContent head={e.date} content={e.content}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <div className={classes.buttonContainer}>
                            {disableButton!="isEnd"?<SwiperButton
                                style={{transform: "translate(15%,-5%) scaleY(50%)"}}
                                onClick={handleNext}
                            ></SwiperButton>:null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryDates;
