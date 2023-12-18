import React from 'react'

const ProjectDashboardHeader = ({ data }) => {
    return (
        <div>
            <h4 className="mb-1">안녕하세요, {data.userName}!</h4>
            <p>You have {data.taskCount} tasks on hand.</p>
        </div>
    )
}

export default ProjectDashboardHeader
