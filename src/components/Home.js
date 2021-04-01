import React from 'react'
import styled from "styled-components";
import Sidebar from './Sidebar';

function Home() {
    return (
        <div className="home">
            <HomeContainer>

                <Sidebar/>
                    
            </HomeContainer>
        </div>
    )
}

export default Home

const HomeContainer=styled.div`

`
