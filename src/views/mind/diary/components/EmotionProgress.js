import { Progress, Card } from 'components/ui'
import { HiEmojiHappy, HiEmojiSad, HiMusicNote, HiChartBar } from "react-icons/hi";

const EmotionProgress = (props) => {
    const {
        goodRatio,
        neutralRatio,
        badRatio
    } = props

    return (
        <>
        {
            goodRatio === 0 && neutralRatio === 0 && badRatio === 0 ?
            (<div className='mb-4'>
            <span className="flex items-center rounded-full gap-1">
                <span className='text-emerald-600 dark:text-emerald-100'>
                <HiChartBar />
                </span>
                <span className='font-semibold text-emerald-600' >감정일기 분석을 위해 새로운 감정일기를 작성해 주세요</span>
                </span>
            </div>)
            : (<div>
                <Card header="감정 일기 분석" className="mb-8">
                <span className='text-sky-600 dark:text-skyblue-100'><HiEmojiHappy className='text-lg' /></span><Progress color="sky-500" percent={goodRatio} className="mb-4" />
                <span className='text-emerald-600 dark:text-emerald-100'><HiMusicNote className='text-lg' /></span><Progress color="emerald-500" percent={neutralRatio} className="mb-4" />
                <span className='text-rose-600 dark:text-rose-100'><HiEmojiSad className='text-lg' /></span><Progress color="rose-500" percent={badRatio} className="mb-4" />
                </Card>
            </div>)
        }
        </>
        
    );
}

export default EmotionProgress;