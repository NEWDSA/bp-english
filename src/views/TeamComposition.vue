<template>
    <div class="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <!-- 顶部导航栏 -->
        <nav class="flex-shrink-0  top-nav">
            <div class="nav-container">
                <!-- 返回首页按钮 -->
                <div class="home-btn" @click="goHome">
                    <div class="home-icon">
                        <img src="../assets/nav_back.png" alt="Home" />
                    </div>
                </div>
                <div class="nav-divider"></div>

                <router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
                <div class="nav-divider"></div>
                <router-link to="/industry-background" class="nav-item">Industry Background</router-link>
                <div class="nav-divider"></div>
                <router-link to="/market-demand" class="nav-item">Market Demand</router-link>
                <div class="nav-divider"></div>
                <router-link to="/business-model" class="nav-item">Business Model</router-link>
                <div class="nav-divider"></div>
                <div class="nav-item active">Team Composition</div>
            </div>
        </nav>
        <!-- 团队详情页 -->
        <!-- min-h-screen  -->
        <div class="bg-gradient-to-br to-magenta-900 overflow-hidden" style="height: calc(100vh - 56px);">
            <div class="flex h-full">
                <!-- 左侧人物区域 -->
                <div class="w-[36%] relative overflow-hidden">
                    <!-- 背景图 -->
                    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
                        :style="{ backgroundImage: `url(${selectedMember.image})` }"></div>

                    <!-- 背景遮罩 -->
                    <div class="absolute inset-0 bg-black/30"></div>

                    <!-- 竖线与圆点 -->
                    <div class="absolute left-[40px] top-1/4 bottom-1/4 w-1 bg-white/30 z-20"></div>
                    <div class="absolute left-[32px] top-1/2 transform -translate-y-1/2 z-30">
                        <div
                            class="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        </div>
                    </div>

                    <!-- 姓名与职位 -->
                    <div class="absolute left-20 top-1/4 z-20">
                        <span
                            class="font-bold text-white tracking-wider text-[36px] font-[Times_New_Roman] transition-all duration-500">
                            {{ selectedMember.enName }}
                        </span>
                    </div>
                    <div class="absolute left-20 bottom-1/4 z-20">
                        <h2
                            class="text-[64px] font-bold text-white tracking-wider font-[Times_New_Roman] transition-all duration-500">
                            {{ selectedMember.role }}
                        </h2>
                    </div>
                </div>
                <!-- 右侧内容区域 -->
                <div
                    class="w-[64%] bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col justify-between">
                    <div class="flex flex-col h-full">
                        <!-- 成员介绍区域 -->
                        <div v-if="!showWhoWeAreContent && !showInvestmentHighlightsContent"
                            class="px-12 py-10 flex gap-8 overflow-y-auto 2xl:h-[560px] xl:h-[400px]">
                            <div class="max-w-4xl flex-shrink-0">
                                <!-- 经历部分 (只有吴关和龚亮显示) -->
                                <div v-if="selectedMember.name === '吴关' || selectedMember.name === '龚亮'"
                                    class="2xl:mb-10 mb-6">
                                    <span class="text-xl text-white mb-4 flex items-center">
                                        <span class="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                                        Experience
                                    </span>
                                    <div class="pl-5 space-y-2">
                                        <div v-for="(item, index) in formatListItems(selectedMember.professionalQualifications)"
                                            :key="`qual-${index}`" class="flex items-start group">
                                            <span class="text-white/70 mr-3 mt-1.5 text-xs">▸</span>
                                            <p
                                                class="text-white/90 text-base leading-relaxed flex-1 group-hover:text-white transition-colors">
                                                {{ item }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- 专长领域部分 (只有非吴关和非龚亮显示) -->
                                <div v-if="selectedMember.name !== '吴关' && selectedMember.name !== '龚亮'"
                                    class="2xl:mb-10 mb-6">
                                    <span class="text-xl text-white mb-4 flex items-center">
                                        <span class="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                                        Areas of expertise
                                    </span>
                                    <div
                                        class="pl-5 bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
                                        <p class="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                                            {{ formatExpertiseWithLineBreaks(selectedMember.areasOfExpertise) }}
                                        </p>
                                    </div>
                                </div>

                                <!-- 主要职责部分 (只有非吴关和非龚亮显示) -->
                                <div v-if="selectedMember.name !== '吴关' && selectedMember.name !== '龚亮'">
                                    <span class="text-xl text-white mb-4 flex items-center">
                                        <span class="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                                        Main Responsibilities
                                    </span>
                                    <div class="pl-5">
                                        <p class="text-white/90 text-base leading-loose text-justify">
                                            {{ selectedMember.description }}
                                        </p>
                                    </div>
                                </div>

                                <!-- 个人简介部分 (只有吴关和龚亮显示) -->
                                <div v-if="selectedMember.name === '吴关' || selectedMember.name === '龚亮'">
                                    <span class="text-xl text-white mb-4 flex items-center">
                                        <span class="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
                                        Personal Profile
                                    </span>
                                    <div class="pl-5">
                                        <p class="text-white/90 text-base leading-loose text-justify">
                                            {{ selectedMember.introduction }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- Who we are 和 Investment Cases 按钮区域 -->
                            <div class="flex flex-col gap-4 flex-shrink-0 self-start">
                                <div class="info-frame cursor-pointer" @click="showWhoWeAreModal">
                                    <h3 class="info-title">Team Introduction</h3>
                                </div>
                                <div class="info-frame cursor-pointer" @click="showInvestmentHighlightsModal">
                                    <h3 class="info-title">Investment Cases</h3>
                                </div>
                            </div>
                        </div>

                        <!-- 底部团队轮播区域 -->
                        <div v-if="!showWhoWeAreContent && !showInvestmentHighlightsContent"
                            class="border-gray-200 px-12 py-8">
                            <!-- 标题 -->
                            <div class="flex items-center justify-between mb-6">
                                <h3
                                    class="text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Y-H2O Team</h3>
                            </div>

                            <!-- 履带式轮播容器 -->
                            <div class="relative w-full px-4 overflow-hidden">
                                <div class="flex transition-transform duration-500 ease-in-out"
                                    :style="{ transform: `translateX(-${scrollPosition}px)` }">
                                    <!-- 单一卡片组，使用两次循环实现无限滚动效果 -->
                                    <template v-for="cycle in 2" :key="cycle">
                                        <div v-for="(member, index) in teamMembers" :key="`${cycle}-${index}`"
                                            @click="handleCardClick(index)" 
                                            :class="[
                                                'rounded-2xl p-4 cursor-pointer group flex-shrink-0 relative overflow-hidden border-white/20 mr-[30px] bg-cover bg-center ',
                                                selectedIndex === index ? 'h-[360px]' : 'h-[320px]'
                                            ]" :style="{
                                                width: '256px',
                                                boxSizing: 'border-box',
                                                boxShadow: '0 0 10px rgba(0,0,0,0.15)',
                                                zIndex: selectedIndex === index ? 20 : 10,
                                                backgroundImage: `url(${member.image})`
                                            }">
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <!-- 导航按钮组 -->
                            <div class="flex mt-10 space-x-3 items-center w-full relative">
                                <!-- <button @click="previousMember"
                                    class="cursor-pointer rounded-full text-gray-500 bg-white/50 hover:bg-black/70 transition-all duration-300 shadow-lg hover:shadow-sm transform hover:scale-105">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2.5" />
                                    </svg>
                                </button> -->

                                <!-- <button @click="nextMember"
                                    class="cursor-pointer rounded-full text-gray-500 bg-white/50 hover:bg-black/70 transition-all duration-300 shadow-lg hover:shadow-sm transform hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2.5" />
                                    </svg>
                                </button> -->

                                <!-- 公司名称 -->
                                <div class="absolute left-[calc(50%+370px)]">
                                    <h2 class="text-2xl text-white">Y-H2O</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Who we are 中间显示内容 -->
            <div v-if="showWhoWeAreContent" class="overlay-content-display">
                <div class="overlay-close-btn" @click="closeWhoWeAreContent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>

                <div class="overlay-content">
                    <div class="presentation-grid">
                        <!-- 左侧：团队介绍 -->
                        <div class="presentation-left">
                            <h1 class="presentation-title">Team Introduction</h1>

                            <div class="content-block">
                                <p class="block-text">The world's first high-performance intelligent hydrofoil focused
                                    on consumer
                                    and industry-grade applications addresses the high energy consumption and low
                                    efficiency of
                                    traditional ships through a "hardware + software service" model. It boasts
                                    leading-edge
                                    technology in core algorithms, dynamic control, and route perception, and has
                                    currently applied for 9
                                    domestic patents, including 6 design patents, 3 utility model patents, and 1
                                    invention patent.
                                </p>
                            </div>

                            <div class="content-block">
                                <div class="achievements-list">
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">Earliest domestic entrant into consumer-grade
                                            water transportation (2015)</span>
                                    </div>
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">Earliest define the direction of new waterborne
                                            cultural tourism vessels in China (2016)</span>
                                    </div>
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">The company with the strongest integration
                                            capability in the national boat industry chain</span>
                                    </div>
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">The company that completed the 5M-class hydrofoil
                                            model experiment globally (2024)</span>
                                    </div>
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">The company that completed the design, R&D, and
                                            production of the 5M hydrofoil globally (2025)</span>
                                    </div>
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">The company with the strongest boat design
                                            capabilities in China, having designed and defined numerous cutting-edge
                                            waterborne technology products.</span>
                                    </div>
                                    <div class="achievement-row">
                                        <span class="bullet">•</span>
                                        <span class="achievement-desc">The company possesses outstanding R&D
                                            capabilities, with a closed-loop system and process.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧：投资案例 -->
                        <div class="presentation-right">
                            <h1 class="presentation-title">Investment Cases</h1>

                            <div class="content-block">
                                <p class="block-primary-text">Hydrofoil integration is the best solution for ship
                                    electrification, unlocking
                                    a trillion-dollar market.</p>
                                <p class="block-text">Currently, ship electrification is limited to simple
                                    oil-to-electric
                                    conversion, failing to fundamentally address the contradiction between energy
                                    consumption and
                                    propulsion efficiency. Hydrofoil technology can truly solve and completely
                                    revolutionize the
                                    energy management model of traditional boats.</p>
                                <p class="block-text">High-performance hydrofoils have proven their value in multiple
                                    scenarios,
                                    with leading overseas companies already investing heavily, while the domestic market
                                    remains
                                    largely untapped.</p>
                                <p class="block-primary-text">Mastering the core industrial chain, possessing superior product
                                    innovation
                                    capabilities, and leading industry development.</p>
                                <p class="block-primary-text">Adhering to self-developed and self-produced components across the
                                    entire
                                    industrial chain, with modular assembly lines.</p>
                                <p class="block-primary-text">Insisting on original design, perfecting the product matrix, and
                                    developing
                                    self-developed intelligent control systems, including a three-mode intelligent
                                    steering wheel,
                                    intelligent cockpit, terminal sales program, high-strength modular hydrofoils, and
                                    high-strength
                                    lightweight hull materials and processes.</p>
                                <p class="block-primary-text">Actively pursuing a global strategy to quickly achieve absolute
                                    leadership in
                                    the consumer market.</p>
                                <p class="block-primary-text">Past products have gained recognition from leading domestic and
                                    international
                                    clients and have been implemented in multiple scenarios such as technology,
                                    transportation,
                                    consumption, and cultural tourism, with 80% of revenue coming from the
                                    transportation sector.
                                    Based on its technological accumulation and significant advantages, the company has
                                    made early
                                    strides in consumer-grade intelligent water transportation.</p>
                                <p class="block-text">It has established partnerships with several leading domestic
                                    (overseas-oriented) companies to jointly promote the implementation of A1+ water
                                    transportation
                                    vehicles.</p>
                                <p class="block-text">The company will release a new product form this July, with no
                                    competitors in
                                    the same size segment. Combining its experience across the entire chain of "product
                                    definition,
                                    technological innovation, supply chain, and channels," the company aims to establish
                                    an absolute
                                    leading advantage.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Investment Cases 中间显示内容 -->
            <div v-if="showInvestmentHighlightsContent" class="works-fullscreen-modal" @click="closeInvestmentHighlightsContent">
                <div class="works-modal-wrapper" @click.stop>
                    <!-- 关闭按钮 -->
                    <button class="works-close-btn" @click="closeInvestmentHighlightsContent">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                    </button>

                    <div class="works-modal-content">
                        <div class="works-images-grid">
                            <template v-for="i in 6" :key="i">
                                <div class="works-image-item">
                                    <img :src="getWorkImage(i)" :alt="`Work ${i}`" class="works-image" />

                                    <!-- 第一张图片文字 -->
                                    <div v-if="i === 1" class="works-text-overlay">
                                        <div class="works-number">1</div>
                                        <div class="works-title">The Definer of the Future Water-X Pontoon</div>
                                        <div class="works-project">Project: Wuhu Pearl</div>
                                        <div class="works-date">Launch Date: September 2022</div>
                                        <div class="works-location">Location: Wuhu, Anhui</div>
                                    </div>

                                    <!-- 第二张图片文字 -->
                                    <div v-if="i === 2" class="works-text-overlay">
                                        <div class="works-number">2</div>
                                        <div class="works-title">Definer of maritime cultural tourism vessels</div>
                                        <div class="works-project">Project: Xunxian 1 and 2</div>
                                        <div class="works-date">Landing Date: May 2017</div>
                                        <div class="works-location">Location: Yantai, Qinhuangdao</div>
                                    </div>

                                    <!-- 第三张图片文字 -->
                                    <div v-if="i === 3" class="works-text-overlay">
                                        <div class="works-number">3</div>
                                        <div class="works-title">Rich resources on B-side and G-side</div>
                                        <div class="works-project">Project: Jiuzhou Bay No. 1 (Nezha)</div>
                                        <div class="works-date">Landing Date: October 2020</div>
                                        <div class="works-location">Location: Zhuhai, Guangdong</div>
                                    </div>

                                    <!-- 第四张图片文字 -->
                                    <div v-if="i === 4" class="works-text-overlay">
                                        <div class="works-number">4</div>
                                        <div class="works-title">Pioneer of consumer transportation</div>
                                        <div class="works-project">Project: Kun</div>
                                        <div class="works-date">Landing Date: April 2024</div>
                                        <div class="works-location">Location: Weihai, Shandong</div>
                                    </div>

                                    <!-- 第五张图片文字 -->
                                    <div v-if="i === 5" class="works-text-overlay">
                                        <div class="works-number">5</div>
                                        <div class="works-title">Complete domestic and overseas channel network</div>
                                        <div class="works-project">Project: ADAMAS</div>
                                        <div class="works-date">Launch Date: March 2025</div>
                                        <div class="works-location">Location: Ho Chi Minh City, Vietnam</div>
                                    </div>

                                    <!-- 第六张图片文字 -->
                                    <div v-if="i === 6" class="works-text-overlay">
                                        <div class="works-number">6</div>
                                        <div class="works-title">Designer of the country's first smart yacht</div>
                                        <div class="works-project">Project: Smart Boat No. 1</div>
                                        <div class="works-date">Landing Date: October 2022</div>
                                        <div class="works-location">Location: Guangdong-Hong Kong-Macao Greater Bay Area
                                        </div>
                                        <div class="works-extra">"Smart Yacht Interior Design Technology Research
                                            Report"</div>
                                        <div class="works-extra">"Smart Yacht Independent Development Project"</div>
                                        <div class="works-extra">"Research on Exterior and Interior Design Technology of
                                            Medium-Sized Luxury Cruise Ships"</div>
                                        <div class="works-extra">"2023 Forward-Looking Research Project"</div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import CEOPng from '../assets/team/1.jpg'
import COOPng from '../assets/team/2.png'
import CFO from '../assets/team/4.png'
import EngineerPng from '../assets/team/3.png'
import qiang from '../assets/team/5.png'
import Jeff from '../assets/team/6.jpg'
import zhiliao from '../assets/team/7.jpg'
const router = useRouter()

// 导航到首页
const goHome = () => {
    router.push('/')
}

// 团队成员数据
const teamMembers = ref([
    {
        name: '吴关',
        enName: 'Kevin',
        role: 'CEO',
        image: CEOPng,
        description: '• Over 10 years of experience in ship design work • 2015-2017 Ferrari Group, Italy - Quality Control and After sales Manager • 2020/10-2022/10 School of Design and Art, China Academy of Art - Industrial Design Teacher • Hangzhou Yihai Ship Design Co., Ltd. - General Manager/Legal Representative • Yushui Flying (Shenzhen) Technology Co., Ltd. - General Manager',
        professionalQualifications: '1. Bachelor of Industrial Design, China Academy of Art; 2. Master of Ship and Yacht Design, University of Genoa, Italy; 3. PhD in Marine Engineering Technology, University of Kuala Lumpur, Malaysia; 4. Internship at the headquarters of Ferretti Group in Italy, participating in yacht design and CMF design; 5. Extensive teaching and management experience in ship, yacht, and industrial product design; 6. Currently CEO of Hangzhou Yi Hai Ship Design Co., Ltd. and Zhuhai Yi Hai Ship Design Co., Ltd.',
        areasOfExpertise: '1. Ship and Yacht Design (Exterior and Interior) 2. Industrial and Transportation Vehicle Styling Design 3. 3D Modeling and Rendering (Rhinoceros, KeyShot, Cinema 4D, etc.) 4. User Experience and Sustainable Design Teaching 5. Corporate Strategy and Design Management',
        introduction: 'Possessing extensive experience in ship, yacht, and industrial design, with a background in both artistic creativity and engineering technology, he graduated from the China Academy of Art and furthered his studies at the University of Genoa in Italy and the University of Kuala Lumpur in Malaysia, focusing on ship and yacht design and marine engineering technology. He previously worked as an intern designer at the Ferretti Group in Italy, and later founded Italian Marine Design Company, leading numerous yacht and cruise ship projects, with his work winning numerous international awards. In addition to corporate management, he has also served as a university lecturer, dedicated to cultivating innovative design talent, integrating aesthetics and practicality, and promoting the internationalization of Chinese ship design.'
    },
    {
        name: '龚亮',
        enName: 'Liang Gong',
        role: 'CFO',
        image: CFO,
        description: '• Founding Partner of Micro Light Innovation Investment • Responsible for tax laws, investment and financing',
        professionalQualifications: '1. Bachelor of Accounting, Sichuan Normal University; currently a Master is Supervisor at the School of Economics and Management, Sichuan Normal University.2. Master of Economic Law, China University of Political Science and Law. 3. Master of Finance (Alternative Asset Management), Stanford University. 4. Private Equity Fund Manager (Primary Market). 5. Entrepreneurship Mentor at Shanghai Jiao Tong University, Sichuan University, University of Electronic Science and Technology of China, Hong Kong University of Science and Technology, and Macau University of Science and Technology. 6. Long-term experience in private equity investment, technology transfer, and IPO consulting.',
        areasOfExpertise: '1. Private Equity Investment and Capital Operation; 2. Technology Transfer and Industrial Incubation; 3. Mergers & Acquisitions and IPO Planning (Mainland China, Hong Kong, Singapore, USA); 4. Innovation and Entrepreneurship Mentoring and Business Model Innovation Training; 5. Industrial Fund Management in Medical Devices, New Materials, Optoelectronics, and Military Industries.',
        introduction: 'A seasoned private equity fund manager with a combined legal and financial background, he studied at China University of Political Science and Law and Stanford University, possessing solid industrial and capital operation capabilities. He has long been involved in technology transfer, industrial fund management, and IPO consulting, leading investments and exits in several well-known projects such as BLT, Andon Health, and Tengdun Technology, accumulating rich experience in capital operations and practical application. He previously worked at Blackstone Group, participating in numerous mergers and acquisitions of internationally renowned companies. Currently, he serves as an entrepreneurship mentor at several universities, dedicated to promoting the integration of technological innovation and capital, and contributing to high-quality industrial development.',
    },
    {
        name: '陈坤灵',
        enName: 'Leo',
        role: 'COO',
        image: COOPng,
        description: '• Product development and delivery • Supply Chain Technology Management',
        professionalQualifications: '1. Graduated from the School of Decorative Art and Design, Guangzhou Maritime University in 2013 (Associate Degree). 2. Graduated from the School of Naval Architecture and Ocean Engineering, Guangzhou Maritime University in 2022 (Bachelor is Degree). 3. Holds Senior Interior Designer Certificate, Senior Furniture Designer Certificate, and Intermediate Ship Engineer Certificate. 4. Has been engaged in ship design and engineering management since 2016; currently a Project Manager at Hangzhou Yihai Ship Design Co., Ltd., and a core member of the Shenzhen Science and Technology Innovation Academy project.',
        areasOfExpertise: '1. Marine Engineering and Interior Design: Proficient in overall planning, structural design, process optimization, on-site technical coordination, and quality control of marine interiors. 2. Product Development and Supply Chain Management: Experienced in the research, development, production, and supply chain coordination of marine seating and modular interior products. 3. Project Management and Technical Coordination: Familiar with the entire process management of large cruise ships, passenger ships, and yachts, including contract documents, design presentations, material procurement, and on-site construction technical coordination. 4. Software Skills: Proficient in AutoCAD, Photoshop, 3D modeling, and Office design and office software.',
        introduction: 'With over eight years of experience in marine engineering and product development, he has led the interior design and quality control of several large cruise ships, including the "Dream Voyage," "Guangzhou Star," and "Foshan Night Cruise Sanlong Bay No. 2." His work has been featured multiple times on CNR.cn. Chen Kunling has achieved significant results in areas such as modular design of marine seats, interior design of solar-powered yachts, and innovation in main light-less systems, generating over 1.5 million RMB in product transactions. He possesses both artistic design and engineering thinking, enabling him to seamlessly integrate design aesthetics with practical functionality. He is a multi-talented marine design engineer combining creativity, technology, and management skills.',
    },
    {
        name: '张世彬',
        enName: 'Ben',
        role: 'Engineer',
        image: EngineerPng,
        description: '• Responsible for performance testing and optimization • CNC structural engineer • Software and hardware embedded engineer • Material research and innovation',
        professionalQualifications: '1. Graduated from Guangzhou Maritime College in 2015 with a diploma in Nautical Technology. 2. Completed professional skills training in game animation design at South China University of Technology in 2016. 3. Possesses 3 years of experience in film and television animation design and 5 years of experience in unmanned surface vessels (USVs) and ship product development. 4. Currently a product manager at Hangzhou YiHai Ship Design Co., Ltd., previously worked at well-known ship and USV R&D companies such as Zhuhai Yunzhou Intelligent Technology Co., Ltd. and Zhuhai Haiyi Ship Design Co., Ltd.',
        areasOfExpertise: '1. Product Development and Interaction Design: Proficient in product appearance design, human-computer interaction logic planning, and functional module design; familiar with the entire process from concept to prototype verification. 2. Film & Animation and Brand Promotion: Experienced in film directing and special effects editing; capable of independently completing the entire process from animation modeling, rendering, post-production editing to brand visual packaging. 3. Ship and Unmanned Vessel Design: Participated in several leading domestic unmanned vessel projects and high-end yacht designs; familiar with ship product structure, technology, interior design, and branding processes. 4. Technical Software Skills: Proficient in professional software such as MAYA, 3DsMax, ZBrush, Houdini, AE, PR, Photoshop, Illustrator, Unreal Engine, AutoCAD, and Office.',
        introduction: `With eight years of experience in product design and film and television creative work, Zhang Shibin possesses both technical research and development and artistic creativity. He led the design and interactive system development of China's first unmanned cargo ship, "Jindouyun No. 0," and participated in several innovative ship projects, including the "Yu" hydrofoil and the Yunzhou leisure platform series. Early in his career, he worked in the film and television industry on modeling and special effects for theatrical productions such as *Armor Hero*, *Star Alliance*, and *Beast Girl*, demonstrating strong visual creativity and brand communication capabilities. Zhang Shibin excels at combining digital art with shipbuilding industrial design, driving innovation throughout the entire product development process from concept design to market launch. He is a cross-disciplinary product designer with both industrial aesthetics and engineering logic.`,
    },
    {
        name: '陈宗强',
        enName: 'John',
        role: 'IE',
        image: qiang,
        description: '• Emotional Interaction Engine • Digital twin simulation • Compile level code optimization',
        professionalQualifications: '1. Graduated from Maoming Radio and Television University in 2012 with a diploma in Computer Engineering. 2. Possesses many years of experience in 3D modeling, virtual reality (VR), and interactive visualization development. 3. Currently working as a VR Display Engineer/Technical Lead at Hangzhou Yihai Ship Design Co., Ltd. 4. Previously worked at Guangzhou Lanyue Ship Design Co., Ltd., Hangzhou Jingtuke Co., Ltd., and Juzhong Decoration Co., Ltd., engaged in interior design and virtual display system development.',
        areasOfExpertise: '1. 3D Modeling and Visualization Design: Proficient in using Unreal Engine (UE4/UE5) for 3D scene building, lighting optimization, and material creation, capable of independently developing virtual model homes and ship VR displays. 2. Virtual Reality and Interactive Development: Familiar with functional modules such as the Blueprint system, GAS (Gameplay Ability System), UMG/Slate, and possess the ability to optimize project performance and implement specialized features. 3. Interface and Motion Design: Expertise in the creation and implementation of UI motion effects, capable of independently completing interface layout, interactive animation, and logo dynamic interpretation design from concept to finished product. 4. Interior Design and Visual Aesthetics: Possess a deep appreciation for spatial aesthetics and design, with a precise grasp of color, proportion, and materiality, and the ability to integrate innovative technology and artistic trends to create high-quality presentations.',
        introduction: 'With over eight years of experience in 3D design and virtual reality development, he has long focused on developing virtual reality projects using Unreal Engine (UE4/UE5), participating in the VR visualization design of several large-scale ship and real estate projects, including the "Zhongwei Fuyu 32-meter Ferry," "Foshan Sanlong Bay," and "Vietnam Cruise Ship P4500-01." In these projects, he was responsible for scene construction, interactive logic development, motion effect implementation, and performance optimization, demonstrating excellent technical innovation and artistic integration capabilities. Chen Zongqiang excels at combining modern design aesthetics with digital technology, bringing high-quality, immersive visual experiences to the fields of ship interior design and virtual display.',
    },
    {
        name: '刘胤霆',
        enName: 'Jeff',
        role: 'SE',
        image: Jeff,
        description: '• Multi physics modeling and simulation • Research and development of intelligent control algorithms • High end equipment system integration',
        professionalQualifications: '1: Graduated from South China University of Technology (Bachelor of Engineering) in Mechanical Engineering in 2023, GPA 3.2/4 2: Currently studying for a Master of Mechanical Engineering (Automotive and Racing Engineering) at Politecnico di Milano, Italy, GPA 23/30 3: Language proficiency: Chinese (native), English (IELTS 7.5), Italian (A2) 4: Proficient in engineering software such as MATLAB, SolidWorks, Ansys Fluent, AutoCAD, Python, and Adams Car 5: Experienced in electric vehicle and aerodynamics research, having won second prize in the China University Student Electric Formula Competition',
        areasOfExpertise: '1. Mechanical and Vehicle Engineering Design: Proficient in mechanical system design, transmission and power structure analysis, and CAD/CAE modeling and simulation. 2. Fluid and Aerodynamic Analysis: Familiar with CFD-based aerodynamic simulation and able to optimize vehicle aerodynamic performance using Ansys Fluent. 3. Electric and Hybrid System Design: Experienced in designing DC-DC power systems and emergency braking (EBS) systems; familiar with electric vehicle control logic and electrical safety architecture. 4. Multidisciplinary Collaborative Modeling and Verification: Able to combine theoretical mechanics, vehicle dynamics, and engineering simulation to complete virtual testing and performance analysis of complex mechanical systems.',
        introduction: `A mechanical engineer, currently pursuing a Master's degree in Automotive and Motorsports Engineering at the Polytechnic University of Milan, Italy. During his time at South China University of Technology, he served as a member of the electronic control team for a Formula E racing team, leading the development of DC-DC power conversion and EBS safety systems; the project won a second-place national award. His research focuses on vehicle aerodynamics and hybrid power system optimization. He is skilled in using CFD technology to analyze ground effects and vehicle aerodynamic performance, and possesses a deep understanding of improving energy efficiency in vehicle design. Liu Yinting combines a solid foundation in engineering theory with an international research perspective, enabling him to conduct mechanical and vehicle engineering design with a systematic approach, providing innovative solutions for intelligent and green transportation.`,
    },
    {
        name: '郑志彦',
        enName: 'Zhiliao Zheng',
        role: 'SP',
        image: zhiliao,
        description: '• Analyze industry trends and competitor dynamics • Participate in business negotiations, sign sales contracts, and ensure their execution • Expand new customers, maintain key customer relationships, and promote long-term cooperation',
        professionalQualifications: `1. Graduated in 2010 from the International Economics and Trade program at South China Agricultural University, Zhujiang College (Bachelor's degree). 2. Possesses over 15 years of experience in the high-end industry and yacht sector, including over 10 years of experience in sales and marketing management for high-end luxury brands. 3. Currently serves as co-founder and general manager of Shenzhen Tingyouqu Technology Co., Ltd., responsible for corporate strategic planning, market expansion, and brand building. 4. Previously served as Senior Client Director at Hainan Haitianshengyan Exhibition Co., Ltd., and Sales Director at Shenzhen Haizhilan Yacht Service Co., Ltd.`,
        areasOfExpertise: '1. Yacht Industry and High-End Market Operations: Possess extensive yacht industry resources and business ecosystem insights, and be familiar with yacht sales, brand promotion, investment strategies, and customer service systems. 2. Market Strategy and Brand Management: Expertise in developing marketing and public relations strategies, with the ability to integrate resources, shape brand image, and drive performance growth. 3. Customer Relationships and Business Development: Long-term service to high-end client groups, with expertise in key account management, negotiation, and channel development, and possessing exceptional communication and leadership skills. 4. Business Management and Strategic Execution: Founded the "Ting Youqu" platform from scratch, achieving success from startup to profitability, demonstrating exceptional strategic thinking and team execution.',
        introduction: 'Zheng Zhiyan, a graduate of Zhujiang College of South China Agricultural University with a degree in International Economics and Trade, is currently the co-founder and General Manager of Shenzhen Tingyouqu Technology Co., Ltd., with over 15 years of experience in the yacht and high-end industries. He initially worked for international freight forwarding companies DHL and Senator, accumulating a background in international trade and logistics. He later transitioned to the yacht industry, serving as Sales Director of Ocean Blue Yachts and Senior Account Director of Hai Tian Sheng Yan, delving into luxury brand marketing and high-end customer service. In 2019, he founded the "Tingyouqu" yacht industry platform, which achieved profitability and secured capital support within just two years. With extensive experience in yacht sales, marketing planning, branding, and business operations, Zheng Zhiyan is a high-end market operations expert who combines strategic vision with practical skills.',
    }
])

// 当前选中的成员索引
const selectedIndex = ref(0)

// Who we are 内容显示状态
const showWhoWeAreContent = ref(false)

// Investment Highlights 内容显示状态
const showInvestmentHighlightsContent = ref(false)

// 卡片总宽度（包含间距）
// const CARD_TOTAL_WIDTH = 230 // 200px宽度 + 30px间距
const CARD_TOTAL_WIDTH = 286 // 256px宽度 + 30px间距

// 滚动位置
const scrollPosition = ref(0)


// 计算当前选中的成员
const selectedMember = computed(() => teamMembers.value[selectedIndex.value])

// 格式化列表项（将带数字的文本转换为列表）
const formatListItems = (text: string) => {
    if (!text) return []
    // 按数字标记分割文本
    const items = text.split(/\d+[.。]/)
        .filter(item => item.trim())
        .map(item => item.trim())
    return items
}

// 格式化专长领域（将带数字的文本转换为逗号分隔的文本）
const formatExpertise = (text: string) => {
    if (!text) return ''
    // 移除数字标记，用逗号连接
    const items = text.split(/\d+[.。]/)
        .filter(item => item.trim())
        .map(item => item.trim())
    return items.join('、')
}

// 格式化专长领域并添加换行
const formatExpertiseWithLineBreaks = (text: string) => {
    if (!text) return ''
    const items = text.split(/\d+[.。]/)
        .filter(item => item.trim())
        .map((item, index, arr) => {
            const trimmed = item.trim()
            return index === arr.length - 1 ? trimmed : trimmed + '\n'
        })
    return items.join('')
}

// 选择成员
const selectMember = (index: number) => {
    selectedIndex.value = index
    updateScrollPosition(index)
}

// 处理卡片点击
const handleCardClick = (index: number) => {
    const currentScrollPos = scrollPosition.value
    const groupLength = teamMembers.value.length * CARD_TOTAL_WIDTH
    const lastIndex = teamMembers.value.length - 1
    
    // 判断当前在第一组还是第二组（使用更精确的判断，避免边界问题）
    const isInFirstGroup = currentScrollPos <= groupLength * 0.5
    
    // 如果在第二组，点击时跳回第一组对应位置（瞬间跳转，不需要动画）
    if (!isInFirstGroup) {
        selectedIndex.value = index
        scrollPosition.value = index * CARD_TOTAL_WIDTH
        const container = document.querySelector('.flex.transition-transform') as HTMLElement
        if (container) {
            // 瞬间跳转，保持 transition 禁用状态
            container.style.transition = 'none'
            container.style.transform = `translateX(-${index * CARD_TOTAL_WIDTH}px)`
            // 在下一个 tick 恢复过渡效果，但不移除内联样式，保持当前位置
            setTimeout(() => {
                if (container) {
                    container.style.transition = 'transform 500ms ease-in-out'
                }
            }, 50)
        }
        return
    }
    
    // 在第一组内处理循环效果
    // 情况1：从第一组最后一张切换到第一张，实现循环效果（从左向右滑动）
    if (selectedIndex.value === lastIndex && index === 0) {
        selectedIndex.value = 0
        
        const container = document.querySelector('.flex.transition-transform') as HTMLElement
        if (container) {
            // 先平滑过渡到第二组的第一张位置
            scrollPosition.value = groupLength
            
            // 等待第一个动画完成后，再平滑滚动回第一组的第一张
            setTimeout(() => {
                if (container) {
                    // 清除内联 transform（如果有），让 Vue 的 :style 绑定完全接管
                    container.style.transform = ''
                    // 平滑滚动回第一组的第一张
                    scrollPosition.value = 0
                }
            }, 500) // 等待第一个过渡动画完成（500ms）
        }
    }
    // 情况2：从第一组第一张切换到最后一张，实现反向循环效果（从右向左滑动）
    else if (selectedIndex.value === 0 && index === lastIndex) {
        selectedIndex.value = lastIndex
        
        const container = document.querySelector('.flex.transition-transform') as HTMLElement
        if (container) {
            // 先平滑过渡到第二组的最后一张位置
            scrollPosition.value = groupLength + lastIndex * CARD_TOTAL_WIDTH
            
            // 等待第一个动画完成后，再平滑滚动回第一组的最后一张
            setTimeout(() => {
                if (container) {
                    // 清除内联 transform（如果有），让 Vue 的 :style 绑定完全接管
                    container.style.transform = ''
                    // 平滑滚动回第一组的最后一张
                    scrollPosition.value = lastIndex * CARD_TOTAL_WIDTH
                }
            }, 500) // 等待第一个过渡动画完成（500ms）
        }
    }
    // 其他情况：在第一组内正常切换
    else {
        selectMember(index)
    }
}

// 更新滚动位置
const updateScrollPosition = (index: number) => {
    scrollPosition.value = index * CARD_TOTAL_WIDTH
}

// 下一个成员 - 履带式向右移动
const nextMember = () => {
    if (selectedIndex.value === teamMembers.value.length - 1) {
        // 最后一张卡片向右移动，履带向左移动显示第一张卡片
        selectedIndex.value = 0

        // 履带式效果：先向左滚动到第一组的开始位置
        // 让用户感觉履带向左移动，然后第一张卡片"转上来"
        scrollPosition.value = 0

        // 立即跳转到第一组，让用户感觉履带向左移动
        const container = document.querySelector('.flex.transition-transform') as HTMLElement
        if (container) {
            container.style.transition = 'none'
            // 跳转到第一组的开始位置
            container.style.transform = `translateX(0px)`
            setTimeout(() => {
                container.style.transition = 'transform 500ms ease-in-out'
                // 然后正确定位到被选中的卡片（第一张）
                updateScrollPosition(selectedIndex.value)
            }, 50)
        }
    } else {
        selectedIndex.value = selectedIndex.value + 1
        updateScrollPosition(selectedIndex.value)
    }
}

// Who we are 控制函数
function showWhoWeAreModal() {
    showInvestmentHighlightsContent.value = false
    showWhoWeAreContent.value = true
}

function closeWhoWeAreContent() {
    showWhoWeAreContent.value = false
}

// Investment Highlights 控制函数
function showInvestmentHighlightsModal() {
    showWhoWeAreContent.value = false
    showInvestmentHighlightsContent.value = true
}

function closeInvestmentHighlightsContent() {
    showInvestmentHighlightsContent.value = false
}

// 获取作品图片路径
function getWorkImage(index: number) {
    return new URL(`../assets/work${index}.png`, import.meta.url).href
}

// 上一个成员 - 履带式向左移动
const previousMember = () => {
    if (selectedIndex.value === 0) {
        // 第一张卡片向左移动，履带向右移动显示最后一张卡片
        selectedIndex.value = teamMembers.value.length - 1

        // 履带式效果：先向右滚动到第二组的开始位置
        // 让用户感觉履带向右移动，然后最后一张卡片"转上来"
        scrollPosition.value = teamMembers.value.length * CARD_TOTAL_WIDTH

        // 立即跳转到第二组，让用户感觉履带向右移动
        const container = document.querySelector('.flex.transition-transform') as HTMLElement
        if (container) {
            container.style.transition = 'none'
            // 跳转到第二组的开始位置
            container.style.transform = `translateX(-${teamMembers.value.length * CARD_TOTAL_WIDTH}px)`
            setTimeout(() => {
                container.style.transition = 'transform 500ms ease-in-out'
                // 然后正确定位到被选中的卡片（最后一张）
                updateScrollPosition(selectedIndex.value)
            }, 50)
        }
    } else {
        selectedIndex.value = selectedIndex.value - 1
        updateScrollPosition(selectedIndex.value)
    }
}

</script>

<style scoped>
/* 顶部导航栏.start */
.home-btn {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 5px;
    border-radius: 50%;
    /* background: rgba(255, 255, 255, 0.1); */
    backdrop-filter: blur(10px);
}

.home-btn:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: scale(1.1);
}

.home-icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.top-nav {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 40;
    padding: 15px 0;
    font-family: 'Arial', sans-serif !important;
}

.nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 12px;
    flex-wrap: wrap;
}

@media (min-width: 1024px) {
    .nav-container {
        gap: 20px;
        padding: 0 20px;
        flex-wrap: nowrap;
    }
}

.nav-item {
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    color: #ffffff;
    text-align: center;
}

@media (min-width: 1024px) {
    .nav-item {
        padding: 10px 20px;
        font-size: 14px;
    }
}

.nav-item:hover {
    color: #00d4ff;
}

.nav-item.active {
    color: #00d4ff;
}

.nav-item.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: #00d4ff;
}

.nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(255, 255, 255, 0.3);
}

/* 顶部导航栏.start */



/* 团队样式 */
/* 自定义动画 */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes glow {

    0%,
    100% {
        box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
    }

    50% {
        box-shadow: 0 0 40px rgba(236, 72, 153, 0.8), 0 0 60px rgba(168, 85, 247, 0.6);
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

@keyframes breathe {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        transform: scale(1.05);
        opacity: 1;
    }
}

/* 主要头像动画 */
.w-80 {
    animation: glow 3s ease-in-out infinite;
}



/* 慢速旋转动画 */
.animate-spin-slow {
    animation: spin-slow 20s linear infinite;
}

/* 文字进入动画 */
.text-7xl {
    animation: slide-in 1s ease-out;
}


/* 背景渐变动画 */
.bg-gradient-to-b {
    background-size: 200% 200%;
    animation: shimmer 8s ease-in-out infinite;
}

/* 卡片进入动画 */
.grid>div {
    animation: fade-in-up 0.6s ease-out;
}

.grid>div:nth-child(1) {
    animation-delay: 0.1s;
}

.grid>div:nth-child(2) {
    animation-delay: 0.2s;
}

.grid>div:nth-child(3) {
    animation-delay: 0.3s;
}

.grid>div:nth-child(4) {
    animation-delay: 0.4s;
}

.grid>div:nth-child(5) {
    animation-delay: 0.5s;
}

.grid>div:nth-child(6) {
    animation-delay: 0.6s;
}

/* 渐变文字效果 */
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
}

/* 玻璃效果增强 */
.backdrop-blur-lg {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.backdrop-blur-3xl {
    backdrop-filter: blur(64px);
    -webkit-backdrop-filter: blur(64px);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* 隐藏水平滚动条但保持滚动功能 */
.overflow-x-auto::-webkit-scrollbar {
    display: none;
}

.overflow-x-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .flex {
        flex-direction: column;
    }

    .w-\[30\%\],
    .w-\[70\%\] {
        width: 100%;
        height: 50vh;
    }

    .text-6xl {
        font-size: 3rem;
    }

    .w-80 {
        width: 14rem;
        height: 14rem;
    }
}

/* 按钮样式处理 */
button:hover {
    border-color: #eeeeee;
}

button:focus,
button:focus-visible {
    outline: none;
}

button {
    background-color: rgba(255, 255, 255, 0.8);
}

/* Who we are 相关样式 */
.info-frame {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.info-frame:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}

.info-title {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    margin: 0;
}

/* 蒙版内容显示样式 */
.overlay-content-display {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.overlay-close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #ffffff;
    cursor: pointer;
    padding: 12px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    z-index: 1001;
}

.overlay-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #00d4ff;
    transform: scale(1.1);
}

.overlay-content {
    width: 95%;
    max-width: none;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 2vw;
    overflow-y: auto;
}

.presentation-title {
    font-size: clamp(1.4rem, 2.2vw, 2.5rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 clamp(1.5rem, 3vh, 2.5rem) 0;
    text-align: left;
}

.presentation-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 4vw, 6rem);
    height: 100%;
    align-items: start;
    width: 100%;
}

.presentation-left,
.presentation-right {
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 3vh, 3rem);
    height: 100%;
}

.content-block {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.block-title {
    font-size: clamp(1rem, 1.8vw, 2rem);
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 clamp(0.6rem, 1vh, 1rem) 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: clamp(0.3rem, 0.6vh, 0.6rem);
}

.block-text {
    font-size: clamp(0.8rem, 1.1vw, 1.3rem);
    color: #ffffff;
    line-height: 1.5;
    margin: 0 0 clamp(0.6rem, 1vh, 1rem) 0;
    opacity: 0.9;
}

.block-text:last-child {
    margin-bottom: 0;
}

.block-primary-text {
    font-size: clamp(1rem, 1.4vw, 1.5rem);
    font-weight: 600;
    color: #ffffff;
    line-height: 1.5;
    margin: 0 0 clamp(0.8rem, 1.2vh, 1.2rem) 0;
    opacity: 1;
}

.achievements-list {
    display: flex;
    flex-direction: column;
    gap: clamp(0.8rem, 1.2vh, 1.5rem);
}

.achievement-row {
    display: flex;
    align-items: flex-start;
    gap: clamp(0.8rem, 1.2vw, 1.5rem);
}

.year-label {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: clamp(0.7rem, 1.1vw, 1.4rem);
    font-weight: 700;
    padding: clamp(0.2rem, 0.4vh, 0.5rem) clamp(0.6rem, 1vw, 1rem);
    border-radius: 15px;
    min-width: clamp(50px, 4vw, 80px);
    text-align: center;
    flex-shrink: 0;
}

.bullet {
    color: #ffffff;
    font-size: clamp(0.9rem, 1.4vw, 2rem);
    font-weight: bold;
    flex-shrink: 0;
    width: clamp(15px, 1.5vw, 25px);
}

.achievement-desc {
    font-size: clamp(0.7rem, 1vw, 1.2rem);
    color: #ffffff;
    line-height: 1.4;
    opacity: 0.9;
    flex: 1;
}

/* 响应式适配 */
@media (max-width: 1024px) {
    .presentation-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .overlay-content {
        height: 90vh;
        overflow-y: auto;
    }
}

@media (max-width: 768px) {
    .overlay-content {
        width: 95%;
        padding: 0 1rem;
        height: 95vh;
    }

    .presentation-title {
        font-size: clamp(2rem, 6vw, 3rem);
        margin-bottom: 1.5rem;
    }
}

/* 全屏作品展示弹窗样式 */
.works-fullscreen-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(25px) saturate(180%);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: worksModalFadeIn 0.4s ease-out;
}

@keyframes worksModalFadeIn {
    from {
        opacity: 0;
        backdrop-filter: blur(0px);
    }

    to {
        opacity: 1;
        backdrop-filter: blur(20px);
    }
}

.works-modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
}

.works-close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #ffffff;
    cursor: pointer;
    padding: 12px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    z-index: 10;
}

.works-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #00d4ff;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.works-modal-content {
    width: 95vw;
    max-width: 1600px;
    height: 700px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* background: rgba(255, 255, 255, 0.1); */
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    /* border-radius: 20px; */
    /* backdrop-filter: blur(15px) saturate(180%); */
    /* box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset; */
}

.works-images-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    gap: 10px;
    justify-content: center;
    align-content: center;
    padding: 20px;
}

.works-image-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
}

.works-image-item:hover {
    transform: scale(1.02);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.works-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
}

.works-image-item:hover .works-image {
    transform: scale(1.05);
}

/* 简洁的文字覆盖层 */
.works-text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    color: white;
    padding: 50px 10px 10px 10px;
}

.works-number {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
}

.works-title {
    font-size: 12px;
    margin-bottom: 6px;
    line-height: 1.2;
}

.works-project,
.works-date,
.works-location {
    font-size: 10px;
    margin-bottom: 3px;
}

.works-extra {
    font-size: 8px;
    margin-bottom: 1px;
    font-style: italic;
    color: white;
}

/* 响应式适配 */
@media (max-width: 1024px) {
    .works-modal-content {
        width: 98vw;
        height: 95vh;
        padding: 20px;
    }

    .works-images-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 1fr;
        gap: 15px;
        padding: 15px 0;
    }
}

@media (max-width: 768px) {
    .works-images-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 1fr;
        gap: 8px;
        overflow-x: auto;
    }

    .works-modal-content {
        padding: 15px;
        width: 98vw;
        height: auto;
        max-height: 90vh;
    }

    .works-close-btn {
        width: 40px;
        height: 40px;
        padding: 10px;
    }

    .works-image-item {
        min-width: 0;
        flex-shrink: 0;
    }
}

</style>
