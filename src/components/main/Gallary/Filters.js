import React from 'react';
import { Container } from 'reactstrap';

const Filters = () => {
    return (
        <div className="filters">
            <Container>
                <ul>
                    <li><button>포포유 픽</button></li>
                    <li><button>최신순</button></li>
                    <li><button>추천순</button></li>
                    <li className="line">|</li>
                    <li><button>전체기간</button></li>
                    <li><button>전체분야</button></li>
                </ul>
            </Container>
        </div>
    )
}

export default Filters;