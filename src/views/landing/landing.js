import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './css/theme.css';
import './css/theme.min.css';
import { FiGithub } from 'react-icons/fi'

function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });

  }, []);


  return (
    <div>
      <main>
        <div className="w-100 h-100 overflow-hidden bg-gray-100" id="top">
          <div className="containernp position-relative">
            <div className="col-12 col-lg-8 mt-0 h-100 position-absolute top-0 end-0 bg-cover"
              // background-image: url(/img/main.png);"></div>
              data-aos="fade-left" style={{ backgroundImage: `url(/img/interior11.webp)` }}></div>
            <div className="row">
              <div className="col-lg-7 py-vh-6 position-relative ps-5" data-aos="fade-right">
                <h1 className="display-1 fw-bold mt-5">PureSync</h1>
                <p className="lead">몸과 마음의 건강을 챙기는 첫 걸음은 기록입니다. 몸과 마음의 건강을 챙기는 겟생, pureSync와 함께하세요.</p>
                <Link className="btn btn-dark btn-xl shadow me-3 rounded-0 my-5" to="/snigin">로그인 </Link>
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
                <p>나의 식단과 운동 기록, 그리고 수면을 기록하여 나의 몸 건강을 추적하고, 마음 일지를 기록하여 매일 매일 나의 감정 상태를 확인하세요. 떨쳐내고 싶은 생각이 있다면, 마음 쓰레기통에서 생각을 버려보세요.</p>
              </div>
              <div className="col-md-6 col-lg-4 py-vh-4 pb-0" data-aos="fade-up" data-aos-delay="400">
                <span className="h5 fw-lighter">02.</span>
                <h3 className="py-5 border-top border-dark">인공지능이 여러분의 감정 분석을 도와줄거에요</h3>
                <p>인공지능이 여러분들에게 마음의 힘을 주는 긍정 문구를 읽어주고, 마음 일지를 기록하면 인공지능이 당신의 글을 분석하여 감정을 파악하는 데에 도움을 줄 것이에요.</p>
              </div>
              <div className="col-md-6 col-lg-4 py-vh-6 pb-0" data-aos="fade-up" data-aos-delay="600">
                <span className="h5 fw-lighter">03.</span>
                <h3 className="py-5 border-top border-dark">유저 커뮤니티에서 다양한 유저들과 만남을 가지세요.</h3>
                <p>유저 커뮤니티 인프라를 제공합니다. 나의 목표나 감정, 그 밖의 꿀팁들을 PureSync 유저들과 함께 나눠보세요.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="py-vh-5 w-100 overflow-hidden" id="numbers">
          <div class="container">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-lg-5">
                <h3 class="py-5 border-top border-dark" data-aos="fade-right">왜 PureSync 일까요?</h3>
              </div>
              <div class="col-lg-6">
                <div class="row">
                  <div class="col-12">
                    <h2 class="display-6 mb-5" data-aos="fade-down">몸 건강과 마음 건강을 함께 챙기세요</h2>
                  </div>
                  <div class="col-lg-6" data-aos="fade-up">
                    <div class="display-1 fw-bold py-4">88%</div>
                    <p class="text-black-50">'건강' 에 대한 개념이 신체적인 건강을 넘어 마음의 건강까지 확대되고 있으며, 관심도가 증가하고 있습니다. 작년에 비해 마음 건강에 관심을 갖는 청년층이 약 11% 증가하여 88% 기록하였고, 스스로 마음을 돌보는 이른바 '마음 챙김'에 관심도가 증가하고 있습니다.</p>
                  </div>
                  <div class="col-lg-6" data-aos="fade-up">
                    <div class="display-1 fw-bold py-4">+300</div>
                    <p class="text-black-50">마음과 몸의 건강을 기록하고 관리하고 싶은 사용자들이 늘어가고 있습니다. PureSync는 매 달 300명 이상의 신규 사용자 유입을 목표로 하고 있습니다</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="py-vh-6 bg-gray-900 text-light w-100 overflow-hidden" id="workwithus">
          <div class="container">
            <div class="row d-flex justify-content-center">
              <div class="row d-flex justify-content-center text-center">
                <div class="col-lg-8 text-center" data-aos="fade">
                  <p class="text-secondary lead">pureSync와 함께 건강을 기록하세요!</p>
                  <h3 class="display-6 mb-5">식단, 운동을 기록하고 나의 기초대사량에 기반한 오늘의 칼로리와 영양 성분을 한 눈에 확인하시고, 인공지능이 감정 상태 분석을 도와주는 마음 일지를 작성하고, 매일 매일 몸과 마음의 균형을 한 눈에 확인하세요!</h3>
                </div>
                <div class="col-12">
                <Link class="btn btn-warning btn-xl shadow me-3 mt-4" data-aos="fade-down" to="/snigup">회원 가입</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer>
        <div class="container small border-top">
          <div class="row d-flex justify-content-between">
            <div class="col-12 p-3">
              <div class="d-flex justify-content-between">
                <h3 class="h6">PureSync</h3>
                <ul class="nav d-flex">

                  <li>
                    <a href="https://github.com/YJiHyeon" target="_blank">
                      <FiGithub />
                      <span class="icon-text">윤지현</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/seongeon0620" target="_blank">
                      <FiGithub />
                      <span class="icon-text">배성언</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/HSPU" target="_blank">
                      <FiGithub />
                      <span class="icon-text">신우석</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/simhyunbo" target="_blank">
                      <FiGithub />
                      <span class="icon-text">심현보</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/orisay" target="_blank">
                      <FiGithub />
                      <span class="icon-text">유재건</span>
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/ruhazle" target="_blank">
                      <FiGithub />
                      <span class="icon-text">유하영</span>
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
