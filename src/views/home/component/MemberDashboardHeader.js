import React, { useState } from 'react';
import { AdaptableCard } from 'components/shared'
import { Button } from 'components/ui'
import { HiOutlineSpeakerphone  } from 'react-icons/hi'

const MemberDashboardHeader = ({ data }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utterThis = new SpeechSynthesisUtterance();
    const synth = window.speechSynthesis;

    const speechText = (text) => {        
        setIsSpeaking(true);

        utterThis.pitch = 2;
        utterThis.text = text;
        synth.speak(utterThis);

        utterThis.onend = () => {
            setIsSpeaking(false);
        };
    }

    return (
        <AdaptableCard>
            <h4 className="mb-1 text-center">
                {data && data.pvContents}
                <Button
                    onClick={() => speechText(data.pvContents)}
                    shape="circle"
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlineSpeakerphone />}
                    disabled={isSpeaking}
                />
            </h4>
            <p className="text-center">-{data && data.pvTalker}-</p>
            
        </AdaptableCard>
    )
}

export default MemberDashboardHeader