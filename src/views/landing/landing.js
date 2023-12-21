import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';

import './css/theme.css';

import { FaGithub } from "react-icons/fa";
import Visit from 'visit'

function Landing() {

  useEffect(() => {
    
    AOS.init({
      duration: 800,
    });

  }, []);

  return (
    <div>
      <Visit />
      <main>
        <div className="w-100 h-100 overflow-hidden bg-gray-100" id="top">
          <div className="containernp position-relative">
            <div className="col-12 col-lg-8 mt-0 h-100 position-absolute top-0 end-0 bg-cover"
              data-aos="fade-left" style={{ backgroundImage: `url(/img/interior11.webp)` }}></div>
            <div className="row">
              <div className="col-lg-7 py-vh-6 position-relative ps-5" data-aos="fade-right">
                <h1 className="display-1 fw-bold mt-5">PureSync</h1>
                <p className="lead" style={{wordBreak: "keep-all"}}>몸과 마음의 건강을 챙기는 첫 걸음은 기록입니다. 몸과 마음의 건강을 챙기는 겟생, pureSync와 함께하고 나만의 더 나은 길을 찾아보세요! 지금 시작하세요.</p>
                <a href='/sign-in' className="btn btn-success px-5 py-3 me-3 rounded-2 my-5" >로그인 </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-vh-5 w-100 overflow-hidden" id="services">
          <div className="container">
            <div className="row d-flex justify-content-end">
              <div className="col-lg-8" data-aos="fade-down">
                <h2 className="display-6">PureSync는 여러분께 다음과 같이 제공합니다</h2>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <span className="h5 fw-lighter">01.</span>
                <h3 className="py-5 border-top border-dark">몸과 마음을 함께 기록하세요</h3>
                <p>나의 식단, 운동, 그리고 수면 기록을 통해 몸의 건강을 추적하며, 감정 상태를 확인하는 마음 일지를 작성하세요. 또한, 마음 쓰레기통에서 떨쳐내고 싶은 생각을 버려보세요. 매일매일 나의 건강과 감정 상태를 관리해보세요.</p>
              </div>
              <div className="col-md-6 col-lg-4 py-vh-4 pb-0" data-aos="fade-up" data-aos-delay="400">
                <span className="h5 fw-lighter">02.</span>
                <h3 className="py-5 border-top border-dark">인공지능이 여러분의 감정 분석을 도와줄거에요</h3>
                <p>인공지능은 여러분에게 긍정적인 에너지를 제공하는 문구를 읽어드리고, 마음 일지를 작성하면 여러분의 글을 분석하여 감정을 파악하는 데 도움을 줄 것이에요.</p>
              </div>
              <div className="col-md-6 col-lg-4 py-vh-6 pb-0" data-aos="fade-up" data-aos-delay="600">
                <span className="h5 fw-lighter">03.</span>
                <h3 className="py-5 border-top border-dark">유저 커뮤니티에서 다양한 유저들과 만남을 가지세요.</h3>
                <p>PureSync 유저들과 함께 목표, 감정, 그리고 유용한 꿀팁을 공유하며 커뮤니티 인프라를 제공합니다. 함께 성장하고, 지식을 나누며 소중한 경험을 공유해보세요!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-vh-5 w-100 overflow-hidden" id="numbers">
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-5">
                <h3 className="py-5 border-top border-dark" data-aos="fade-right">왜 PureSync 일까요?</h3>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-12">
                    <h2 className="display-6 mb-5" data-aos="fade-down">몸 건강과 마음 건강을 함께 챙기세요</h2>
                  </div>
                  <div className="col-lg-6" data-aos="fade-up">
                    <div className="display-1 fw-bold py-4">88%</div>
                    <p className="text-black-50">'건강' 개념은 이제 신체적인 건강뿐만 아니라 마음의 건강까지를 포함하며, 관심도가 상당히 증가하고 있습니다. 작년에 비해, 청년층에서 마음 건강에 대한 관심이 약 11% 증가하여 88%에 이르렀으며, 스스로 마음을 돌보는 '마음 챙김' 역시 관심이 증가하고 있습니다.</p>
                  </div>
                  <div className="col-lg-6" data-aos="fade-up">
                    <div className="display-1 fw-bold py-4">+300</div>
                    <p className="text-black-50">마음과 몸의 건강을 기록하고 관리하고 싶어하는 사용자들이 점점 늘어가고 있습니다. PureSync는 매 달 300명 이상의 신규 사용자를 유입시키는 것을 목표로 하고 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="py-vh-6 bg-gray-900 text-light w-100 overflow-hidden" id="workwithus">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8 text-center" data-aos="fade">
                  <p className="text-secondary lead">PureSync와 함께 건강을 기록해보세요!</p>
                  <h3 className="mb-4 lh-base" style={{wordBreak: "keep-all"}}>식단과 운동 기록을 통해 오늘의 칼로리 및 영양 성분을 확인하고, 감정 상태 분석을 지원하는 인공지능 기반 마음 일지를 작성하여 매일 몸과 마음의 균형을 손쉽게 파악하세요!</h3>
                </div>
                <div className="col-12">
                <a href='/sign-up' className="btn btn-success px-5 py-3 rounded-2 me-3 mt-4" data-aos="fade-down" >회원 가입</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container small border-top">
          <div className="row d-flex justify-content-between">
            <div className="col-12 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="h6 mb-0">PureSync</h3>
                <ul className="nav d-flex gap-3">

                  <li>
                    <a href="https://github.com/YJiHyeon" target="_blank" className="flex align-items-center text-decoration-none gap-1">
                      <FaGithub />
                      <span className="icon-text">윤지현</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/seongeon0620" target="_blank" className="flex align-items-center text-decoration-none gap-1">
                      <FaGithub />
                      <span className="icon-text">배성언</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/HSPU" target="_blank" className="flex align-items-center text-decoration-none gap-1">
                      <FaGithub />
                      <span className="icon-text">신우석</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/simhyunbo" target="_blank" className="flex align-items-center text-decoration-none gap-1">
                      <FaGithub />
                      <span className="icon-text">심현보</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/orisay" target="_blank" className="flex align-items-center text-decoration-none gap-1">
                      <FaGithub />
                      <span className="icon-text">유재건</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/ruhazle" target="_blank" className="flex align-items-center text-decoration-none gap-1">
                    <FaGithub />
                      <span className="icon-text">유하영</span>
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}

export default Landing;
