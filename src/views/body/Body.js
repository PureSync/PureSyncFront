import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { DatePicker, Button } from 'components/ui'
import Menu from 'components/body/menu'
import Exercise from 'components/body/exercise'
import Summry from 'components/body/summary'
import { apiGetMenu, apiDeleteMenu, apiGetExercise, apiDeleteExercise, apiGetSummary } from 'services/BodyRecord'

const BodyMenu = () => {


    // 날짜 계산 ----------------------------------------------------------------
    let today = new Date();
    const toDate = (today) => {
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();

        if (month < 10)
            month = '0' + month;
        if (date < 10)
            date = '0' + date;

        return year + "-" + month + "-" + date;
    }

    const [selectDate, setSelectDate] = useState(toDate(today));


    // Mneu -------------------------------------------------------------------------------------------------
    const [menuData, setMenuData] = useState([]);

    //식사 유형에 대한 총 칼로리
    const [breakfastTotalCalories, setBreakfastTotalCalories] = useState(0);
    const [lunchTotalCalories, setLunchTotalCalories] = useState(0);
    const [dinnerTotalCalories, setDinnerTotalCalories] = useState(0);
    const [snackTotalCalories, setSnackTotalCalories] = useState(0);
    const [dailyTotalCalories, setDailyTotalCalories] = useState(0);
    const [menuRefresh, setMenuRefresh] = useState(false);

    const sendMenuData = {
        menu_date: selectDate,
    };

    // 식단 리스트 불러오기
    const callMenu = () => {
        apiGetMenu(sendMenuData)
            .then((res) => {
                const menuList = res.data.data.menuList;
                let breakfastCalories = 0;
                let lunchCalories = 0;
                let dinnerCalories = 0;
                let snackCalories = 0;
                let dailyCalories = 0;

                menuList.forEach((item) => {
                    const mealCalories = parseFloat(item.menu_total);
                    dailyCalories += mealCalories;

                    switch (item.menu_when) {
                        case 1: // 아침
                            breakfastCalories += mealCalories;
                            break;
                        case 2: // 점심
                            lunchCalories += mealCalories;
                            break;
                        case 3: // 저녁
                            dinnerCalories += mealCalories;
                            break;
                        case 4: // 간식
                            snackCalories += mealCalories;
                            break;
                        default:
                            break;
                    }
                });

                setBreakfastTotalCalories(breakfastCalories.toFixed(2));
                setLunchTotalCalories(lunchCalories.toFixed(2));
                setDinnerTotalCalories(dinnerCalories.toFixed(2));
                setSnackTotalCalories(snackCalories.toFixed(2));
                setDailyTotalCalories(dailyCalories.toFixed(2));
                setMenuData(menuList);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    // 식단 삭제
    const menuDelete = (menu_seq) => {
        const deleteMenuData = {
            menuSeq: menu_seq
        };
        apiDeleteMenu(deleteMenuData)
            .then((res) => {
                setMenuRefresh(!menuRefresh);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Exercise ----------------------------------------------------------------------------------------------
    const [exerciseData, setExerciseData] = useState([]);
    const [totalExerciseCalories, setTotalExerciseCalories] = useState(0);
    const [exerciseRefresh, setExerciseRefresh] = useState(false);

    const sendExerciseData = {
        el_date: selectDate,
    };


    const callExercise = () => {
        apiGetExercise(sendExerciseData)
            .then((res) => {
                setExerciseData(res.data.data.exerciseList);

                // 총 운동 칼로리 계산
                let total = 0;
                res.data.data.exerciseList.forEach((item) => {
                    total += item.el_total;
                });

                setTotalExerciseCalories(total.toFixed(2));

            })
            .catch((error) => {
                console.error(error);
            });

    };

    //운동 삭제
    const exerciseDelete = (el_seq) => {
        const deleteExerciseData = {
            elSeq: el_seq
        };
        apiDeleteExercise(deleteExerciseData)
            .then((res) => {
                setExerciseRefresh(!exerciseRefresh);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    //summary ----------------------------------------------------------------------------------------------------
    const [exTotal, setExTotal] = useState("");             // 운동 총 칼로리
    const [menuWhenData, setMenuWhenData] = useState([]);   // 아점저간 각 칼로리
    const [bodyBaseData, setBodyBaseData] = useState([]);   // 기초대사량

    const sendSummaryData = {
        menu_date: selectDate,
        el_date: selectDate,
    };

    // 데이터 불러오기
    const callSummary = () => {
        apiGetSummary(sendSummaryData)
            .then((res) => {
                const menuTotalWhenList = res.data.data.menuTotalWhenList;
                const getBodyBase = res.data.data.getBodyBase;
                const exerciseTotalList = res.data.data.exerciseTotalList;
                const whenTotalData = {};

                menuTotalWhenList.forEach((item) => {
                    const menu_when = item.menu_when;
                    const when_total = item.when_total;
                    whenTotalData[menu_when] = when_total;
                });

                let el_total = 0;
                if (exerciseTotalList.length > 0)
                    el_total = exerciseTotalList[0].el_total;

                let cbodyBaseData = getBodyBase[0].body_base;

                setMenuWhenData(whenTotalData);
                setExTotal(el_total.toFixed(2));
                setBodyBaseData(cbodyBaseData.toFixed(2));


            })
            .catch((error) => {
                console.error(error);
            });
    };

    // body useEffect -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        callMenu();
        callExercise();
        callSummary();
    }, [selectDate, menuRefresh, exerciseRefresh]);

    const DatePickerClick = (date) => {
        setSelectDate(date);
    }

    // 등록
    const writeOK = (flag) => {
        // alert(flag);
        setExerciseRefresh(!exerciseRefresh);
        setMenuRefresh(!menuRefresh);
    }

    // return -----------------------------------------------------------------------------------------------------

    return (
        <>
            <DatePicker
                DatePickerClick={DatePickerClick}
                placeholder={selectDate}
                defaultValue={new Date(selectDate)}
            />
            <br />
            <Menu selectDate={selectDate}
                menuData={menuData}
                dailyTotalCalories={dailyTotalCalories}
                lunchTotalCalories={lunchTotalCalories}
                dinnerTotalCalories={dinnerTotalCalories}
                snackTotalCalories={snackTotalCalories}
                breakfastTotalCalories={breakfastTotalCalories}
                menuDelete={menuDelete}
                writeOK={writeOK}
            />
            <br /><br /><br />
            <hr />
            <br />
            <Exercise selectDate={selectDate}
                exerciseData={exerciseData}
                totalExerciseCalories={totalExerciseCalories}
                exerciseDelete={exerciseDelete}
                writeOK={writeOK}
            />
            <br />
            <hr />
            <br />
            <Summry selectDate={selectDate}
                exTotal={exTotal}
                menuWhenData={menuWhenData}
                bodyBaseData={bodyBaseData}
            />
        </>
    )
}

export default BodyMenu
