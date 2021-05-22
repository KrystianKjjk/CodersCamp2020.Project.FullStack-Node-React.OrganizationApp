import React from 'react'
import PageHeader from '../../components/PageHeader'
import ReusableGoBack from '../../components/ReusableGoBack'

export interface DetailPageProps {
  pageName: string
  elementName: string
}

const DetailPage: React.FC<DetailPageProps> = ({ children, ...restProps }) => {
  return (
    <div>
      <PageHeader>
        <ReusableGoBack {...restProps} />
      </PageHeader>
      {children}
    </div>
  )
}

export default DetailPage
