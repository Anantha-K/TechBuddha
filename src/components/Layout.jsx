import React from 'react'
import {Helmet} from "react-helmet";


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
        <Helmet>
        <meta charset="UTF-8"/>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
      <meta name="author" content={author}/>
                <title>{title}</title>
            </Helmet>
            {children}

    </div>
  )
}

Layout.defaultProps={
    title:"LenientTree is a comprehensive platform designed to empower students by providing information about ideathons and hackathons. It enables users to develop and showcase their skills through projects hosted on the platform, while fostering collaboration and learning through interactions with a diverse community of members.",
    description:"Discover top hackathons, build projects, and collaborate with innovators on LenientTree.",
    keywords:"services, Assistance,Ideathons platform,Hackathons directory,Student innovation hub,Hackathon listings,Find hackathons online,Join ideathons,Hackathon opportunities, Project showcase for students,Build and share projects,Collaborative coding platform,Student skill development,Tech competitions for students,Hackathon community,Networking for innovators,Coding challenges for students",
    author:"Lenient Tree "
  }

export default Layout