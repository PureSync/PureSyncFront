import {useEffect, useState} from "react";
import SendHeaderCookie from 'utils/hooks/getHeaderCookie'
import { Loading } from 'components/shared'
import { getMemberDashboardData } from './store/dataSlice'
import {getPositive} from 'services/DashboardService'
import { injectReducer } from 'store/index'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import MemberDashboardHeader from "./component/MemberDashboardHeader"
import Statistic from './component/Statistic'
import TaskOverview from "./component/TaskOverview"
import EatOverview from "./component/EatOverview"
import { DatePicker, Button } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import 'dayjs/locale/ko'

injectReducer('memberDashboard', reducer)

const Dashboard = () => {
    const token = SendHeaderCookie(); 
    const dispatch = useDispatch()

    let today = new Date();
    const [selectDate, setSelectDate] = useState(today);
    const [positive, setPositive] = useState(null);
    
    const defaultData = useSelector((state) => state.memberDashboard.data.dashboardData.default);
    const menuList = useSelector((state) => state.memberDashboard.data.dashboardData.menuList);
    const exerciseList = useSelector((state) => state.memberDashboard.data.dashboardData.exercise);
    const sleepList = useSelector((state) => state.memberDashboard.data.dashboardData.sleep);
    const loading = useSelector((state) => state.memberDashboard.data.loading);

    useEffect(() => {
        fetchData();
        fetchPositiveData();
    }, [dispatch])

    const fetchData = (selectedDate) => {
        dispatch(getMemberDashboardData(selectedDate))
    }

    const fetchPositiveData = async () => {
        await getPositive()
            .then((res) => {
                console.log(res.data);
                setPositive(res.data.data.Positive)}
            )
            .catch((error) => {console.log("에러 발생" + error)})
    }

    const DatePickerClick = (date) => {
        fetchData(date);
        setSelectDate(date);
    }
    

    return (
        <div className="">
            <Loading loading={loading}>
                <div className="grid grid-cols-3 gap-4">
                    <AdaptableCard>
                    <div className="mb-1 font-semibold text-sm">기준일자</div>
                    <DatePicker
                        locale="ko"
                        DatePickerClick={DatePickerClick}
                        placeholder = {selectDate}
                        defaultValue={selectDate}
                    />
                    </AdaptableCard>
                    
                    <div className="col-span-2">
                        <MemberDashboardHeader data={positive}/>
                    </div>
                </div>
                <Statistic data={defaultData} />           
                <EatOverview dataOrigin={menuList}/>
                <TaskOverview data={exerciseList} className="mb-5 mt-5" title="운동" />
                <TaskOverview data={sleepList} className="mb-5" title="수면" subtitle="(단위:분)"/>
            </Loading>
        </div>
    )
}

export default Dashboard
