<template>
    <div class="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <!-- 顶部导航栏 -->
        <TopNavigation />

        <!-- 团队详情页 -->
        <!-- min-h-screen  -->
        <div class="bg-gradient-to-br to-magenta-900 overflow-hidden" style="height: calc(100vh - 56px);">
            <div class="flex h-full">
                <!-- 左侧人物区域 -->
                <div class="w-[32%] md:w-[34%] lg:w-[36%] relative overflow-hidden flex-shrink-0">
                    <!-- 背景图 -->
                    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
                        :style="{ backgroundImage: `url(${selectedMember.image})` }"></div>

                    <!-- 背景遮罩 -->
                    <div class="absolute inset-0 bg-black/30"></div>

                    <!-- 竖线与圆点 -->
                    <div class="absolute left-6 md:left-8 lg:left-[40px] top-1/4 bottom-1/4 w-1 bg-white/30 z-20"></div>
                    <div class="absolute left-4 md:left-6 lg:left-[32px] top-1/2 transform -translate-y-1/2 z-30">
                        <div
                            class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        </div>
                    </div>

                    <!-- 姓名与职位 -->
                    <div class="absolute left-12 md:left-16 lg:left-20 top-1/4 z-20">
                        <span
                            class="font-bold text-white tracking-wider text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[32px] 2xl:text-[36px] font-[Times_New_Roman] transition-all duration-500">
                            {{ selectedMember.enName }}
                        </span>
                    </div>
                    <div class="absolute left-12 md:left-16 lg:left-20 bottom-1/4 z-20">
                        <h2
                            class="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[56px] 2xl:text-[64px] font-bold text-white tracking-wider font-[Times_New_Roman] transition-all duration-500">
                            {{ selectedMember.role }}
                        </h2>
                    </div>
                </div>
                <!-- 右侧内容区域 -->
                <div
                    class="w-[68%] md:w-[66%] lg:w-[64%] bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col justify-between min-w-0 relative">
                    <div class="flex flex-col h-full">
                        <!-- Who we are 和 Investment Cases 按钮区域 - 固定在右上角 -->
                        <div v-if="!showWhoWeAreContent && !showInvestmentHighlightsContent"
                            class="absolute top-6 right-4 sm:right-6 md:right-8 lg:right-10 xl:right-10 2xl:right-12 z-20 flex flex-col gap-3 md:gap-4">
                            <div class="info-frame cursor-pointer whitespace-nowrap" @click="showWhoWeAreModal">
                                <h3
                                    class="info-title text-sm sm:text-base md:text-lg lg:text-lg xl:text-base 2xl:text-lg">
                                    Team Introduction</h3>
                            </div>
                            <div class="info-frame cursor-pointer whitespace-nowrap"
                                @click="showInvestmentHighlightsModal">
                                <h3
                                    class="info-title text-sm sm:text-base md:text-lg lg:text-lg xl:text-base 2xl:text-lg">
                                    Excellent Cases</h3>
                            </div>
                            <div class="info-frame cursor-pointer whitespace-nowrap" @click="showPastExperienceModal">
                                <h3
                                    class="info-title text-sm sm:text-base md:text-lg lg:text-lg xl:text-base 2xl:text-lg">
                                    Past Experience</h3>
                            </div>
                        </div>

                        <!-- 成员介绍区域 -->
                        <div v-if="!showWhoWeAreContent && !showInvestmentHighlightsContent"
                            class="pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-10 2xl:pl-12 pr-[180px] sm:pr-[200px] md:pr-[220px] lg:pr-[240px] xl:pr-[240px] 2xl:pr-[260px] py-6 md:py-8 lg:py-10 overflow-y-auto 2xl:h-[560px] xl:h-[400px]">
                            <div class="flex-1 min-w-0 max-w-full">
                                <!-- 经历部分 (只有吴关和龚亮显示) -->
                                <div v-if="selectedMember.name === '吴关' || selectedMember.name === '龚亮'"
                                    class="2xl:mb-10 mb-4 md:mb-6">
                                    <span
                                        class="text-base sm:text-lg md:text-xl lg:text-xl xl:text-lg 2xl:text-xl text-white mb-3 md:mb-4 flex items-center">
                                        <span
                                            class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full mr-2 md:mr-3"></span>
                                        Experience
                                    </span>
                                    <div class="pl-3 md:pl-4 lg:pl-5 space-y-2">
                                        <div v-for="(item, index) in formatListItems(selectedMember.professionalQualifications)"
                                            :key="`qual-${index}`" class="flex items-start group">
                                            <span
                                                class="text-white/70 mr-2 md:mr-3 mt-1.5 text-[10px] sm:text-xs flex-shrink-0">▸</span>
                                            <p
                                                class="text-white/90 text-sm sm:text-base md:text-base lg:text-base xl:text-sm 2xl:text-base leading-relaxed flex-1 min-w-0 group-hover:text-white transition-colors break-words">
                                                {{ item }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- 专长领域部分 (只有非吴关和非龚亮显示) -->
                                <div v-if="selectedMember.name !== '吴关' && selectedMember.name !== '龚亮'"
                                    class="2xl:mb-10 mb-4 md:mb-6">
                                    <span
                                        class="text-base sm:text-lg md:text-xl lg:text-xl xl:text-lg 2xl:text-xl text-white mb-3 md:mb-4 flex items-center">
                                        <span
                                            class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full mr-2 md:mr-3"></span>
                                        Areas of expertise
                                    </span>
                                    <div
                                        class="pl-3 md:pl-4 lg:pl-5 bg-white/10 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-white/20 backdrop-blur-sm">
                                        <p
                                            class="text-white/90 text-sm sm:text-base md:text-base lg:text-base xl:text-sm 2xl:text-base leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                                            {{ formatExpertiseWithLineBreaks(selectedMember.areasOfExpertise) }}
                                        </p>
                                    </div>
                                </div>

                                <!-- 主要职责部分 (只有非吴关和非龚亮显示) -->
                                <div v-if="selectedMember.name !== '吴关' && selectedMember.name !== '龚亮'">
                                    <span
                                        class="text-base sm:text-lg md:text-xl lg:text-xl xl:text-lg 2xl:text-xl text-white mb-3 md:mb-4 flex items-center">
                                        <span
                                            class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full mr-2 md:mr-3"></span>
                                        Main Responsibilities
                                    </span>
                                    <div class="pl-3 md:pl-4 lg:pl-5">
                                        <p
                                            class="text-white/90 text-sm sm:text-base md:text-base lg:text-base xl:text-sm 2xl:text-base leading-loose break-words overflow-wrap-anywhere">
                                            {{ selectedMember.description }}
                                        </p>
                                    </div>
                                </div>

                                <!-- 个人简介部分 (只有吴关和龚亮显示) -->
                                <div v-if="selectedMember.name === '吴关' || selectedMember.name === '龚亮'">
                                    <span
                                        class="text-base sm:text-lg md:text-xl lg:text-xl xl:text-lg 2xl:text-xl text-white mb-3 md:mb-4 flex items-center">
                                        <span
                                            class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full mr-2 md:mr-3"></span>
                                        Personal Profile
                                    </span>
                                    <div class="pl-3 md:pl-4 lg:pl-5">
                                        <p
                                            class="text-white/90 text-sm sm:text-base md:text-base lg:text-base xl:text-sm 2xl:text-base leading-loose break-words overflow-wrap-anywhere">
                                            {{ selectedMember.introduction }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 底部团队轮播区域 -->
                        <div v-if="!showWhoWeAreContent && !showInvestmentHighlightsContent"
                            class="border-gray-200 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12 py-4 md:py-6 lg:py-8">
                            <!-- 标题 -->
                            <div class="flex items-center justify-between mb-4 md:mb-6">
                                <h3
                                    class="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Y-H2O Team</h3>
                            </div>

                            <!-- 履带式轮播容器 -->
                            <div class="relative w-full">
                                <div class="px-2 sm:px-3 md:px-4 overflow-hidden carousel-container">
                                    <div class="flex transition-transform duration-500 ease-in-out"
                                        :style="{ transform: `translateX(-${scrollPosition}px)` }">
                                        <!-- 单一卡片组，使用两次循环实现无限滚动效果 -->
                                        <template v-for="cycle in 2" :key="cycle">
                                            <div v-for="(member, index) in teamMembers" :key="`${cycle}-${index}`"
                                                @click="handleCardClick(index)"
                                                class="flex-shrink-0 mr-[30px] cursor-pointer" :style="{
                                                    width: '256px',
                                                    zIndex: selectedIndex === index ? 20 : 10
                                                }">
                                                <!-- 图片部分 -->
                                                <div :class="[
                                                    'rounded-2xl p-4 relative overflow-hidden border-white/20 bg-cover bg-center',
                                                    selectedIndex === index ? 'h-[360px]' : 'h-[320px]'
                                                ]" :style="{
                                                    boxSizing: 'border-box',
                                                    boxShadow: '0 0 10px rgba(0,0,0,0.15)',
                                                    backgroundImage: `url(${member.image})`
                                                }">
                                                </div>
                                                <!-- 名字部分 -->
                                                <div class="mt-3 text-center">
                                                    <!-- <div class="text-white text-base font-medium">{{ member.name }}</div> -->
                                                    <div class="text-gray-300 text-[18px] mt-1">{{ member.enName }}
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <!-- 公司名称 - 定位在轮播容器最右端底部 -->
                                <div class="absolute bottom-[-8px] right-0 z-30">
                                    <h2
                                        class="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-xl 2xl:text-2xl text-white">
                                        Y-H2O</h2>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 团队介绍 -->
            <div v-if="showWhoWeAreContent"
                class="fixed inset-0 bg-black/70 backdrop-blur-[10px] z-[1000] flex justify-center items-center p-5">
                <div class="absolute top-[30px] right-[30px] bg-white/10 border border-white/30 text-white cursor-pointer p-3 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-[1001] hover:bg-white/20 hover:text-[#00d4ff] hover:scale-110"
                    @click="closeWhoWeAreContent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>

                <div class="w-[95%] max-w-none h-[85vh] flex flex-col justify-start px-[2vw] overflow-y-auto">
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[clamp(2rem,4vw,6rem)] h-full items-start w-full">
                        <!-- 左侧：团队介绍 -->
                        <div class="flex flex-col items-center text-center gap-3">
                            <p class="text-[30px] font-bold text-white mb-[clamp(1.5rem,3vh,2.5rem)] text-left">Who we
                                are?</p>

                            <div class="mb-[clamp(3rem,1vh,1rem)]">
                                <p class="text-[20px] leading-[2] text-white">The world's first high-performance
                                    intelligent
                                    hydrofoil focused
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

                            <div class="flex-1 flex flex-col">
                                <div class="flex flex-col gap-[clamp(0.6rem,1vh,1.2rem)]">
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 flex-1">Earliest domestic entrant into
                                            consumer-grade
                                            water transportation (2015)</span>
                                    </div>
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] leading-[1.8] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 leading-[1.8] flex-1">Earliest define the
                                            direction
                                            of new waterborne
                                            cultural tourism vessels in China (2016)</span>
                                    </div>
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] leading-[1.8] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 leading-[1.8] flex-1">The company with
                                            the strongest
                                            integration
                                            capability in the national boat industry chain</span>
                                    </div>
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] leading-[1.8] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 leading-[1.8] flex-1">The company that
                                            completed the
                                            5M-class hydrofoil
                                            model experiment globally (2024)</span>
                                    </div>
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] leading-[1.8] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 leading-[1.8] flex-1">The company that
                                            completed the
                                            design, R&D, and
                                            production of the 5M hydrofoil globally (2025)</span>
                                    </div>
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] leading-[1.8] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 leading-[1.8] flex-1">The company with
                                            the strongest
                                            boat design
                                            capabilities in China, having designed and defined numerous cutting-edge
                                            waterborne technology products.</span>
                                    </div>
                                    <div class="flex items-center gap-[clamp(0.6rem,1vw,1.2rem)]">
                                        <span class="text-white/70 text-[24px] leading-[1.8] flex-shrink-0">•</span>
                                        <span class="text-[18px] text-white/70 leading-[1.8] flex-1">The company
                                            possesses
                                            outstanding R&D
                                            capabilities, with a closed-loop system and process.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧：投资亮点 -->
                        <div class="flex flex-col gap-[clamp(1rem,2vh,2rem)] h-full">
                            <p class="text-[30px] font-bold text-white mb-[clamp(1.5rem,3vh,2.5rem)] text-left">
                                Investment
                                Highlights</p>

                            <div class="flex-1 flex flex-col">
                                <p
                                    class="text-[20px] text-white leading-[1.5] mb-[clamp(0.8rem,1.2vh,1.2rem)] opacity-100">
                                    Hydrofoil integration is the best solution for ship
                                    electrification, unlocking
                                    a trillion-dollar market.</p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span class="leading-[1.8]">Currently, ship electrification is limited to simple
                                        oil-to-electric
                                        conversion, failing to fundamentally address the contradiction between energy
                                        consumption and
                                        propulsion efficiency. Hydrofoil technology can truly solve and completely
                                        revolutionize the
                                        energy management model of traditional boats.</span>
                                </p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span class="leading-[1.8]">High-performance hydrofoils have proven their value in
                                        multiple
                                        scenarios,
                                        with leading overseas companies already investing heavily, while the domestic
                                        market
                                        remains
                                        largely untapped.</span>
                                </p>
                                <p
                                    class="text-[20px] text-white leading-[1.5] mb-[clamp(0.8rem,1.2vh,1.2rem)] opacity-100 mt-4">
                                    Mastering the core industrial chain, possessing superior
                                    product
                                    innovation
                                    capabilities, and leading industry development.</p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span>Adhering to self-developed and self-produced components
                                        across the
                                        entire
                                        industrial chain, with modular assembly lines.</span>
                                </p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span class="leading-[1.8]">Insisting on original design, perfecting the product
                                        matrix, and
                                        developing
                                        self-developed intelligent control systems, including a three-mode intelligent
                                        steering wheel,
                                        intelligent cockpit, terminal sales program, high-strength modular hydrofoils,
                                        and
                                        high-strength
                                        lightweight hull materials and processes.</span>
                                </p>
                                <p
                                    class="text-[20px] text-white leading-[1.5] mb-[clamp(0.8rem,1.2vh,1.2rem)] opacity-100 mt-4">
                                    Actively pursuing a global strategy to quickly achieve
                                    absolute
                                    leadership in
                                    the consumer market.</p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span class="leading-[1.8]">Our products have gained recognition from leading
                                        domestic and
                                        international clients and have been implemented in various scenarios, including
                                        technology,
                                        transportation, consumption, and cultural tourism. 80% of our revenue comes from
                                        the
                                        transportation sector.</span>
                                </p>
                                <p
                                    class="text-[20px] text-white leading-[1.5] mb-[clamp(0.8rem,1.2vh,1.2rem)] opacity-100 mt-4">
                                    Based on its technological accumulation and significant advantages, it has made
                                    early
                                    arrangements for consumer-grade intelligent water transportation.</p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span class="leading-[1.8]">We have taken the lead in partnering with several
                                        leading domestic
                                        (overseas-oriented) companies to jointly promote the application of AI + water
                                        transportation.</span>
                                </p>
                                <p
                                    class="text-[18px] text-white/70 leading-[1.5] mb-[clamp(0.6rem,1vh,1rem)] flex items-start">
                                    <span
                                        class="inline-block w-2 h-2 bg-[#bbbab9] rounded-full mr-4 mt-[10px] flex-shrink-0"></span>
                                    <span class="leading-[1.8]">The company will release a new product form in July this
                                        year, which
                                        will have no competitors in the same size. Combining its experience in the
                                        entire chain of
                                        "product definition - technological innovation - supply chain - channels", it
                                        will establish
                                        an absolute leading advantage.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 优秀案例 -->
            <div v-if="showInvestmentHighlightsContent"
                class="fixed inset-0 bg-white/10 backdrop-blur-[25px] backdrop-saturate-[180%] z-[2000] flex justify-center items-center animate-fadeIn"
                @click="closeInvestmentHighlightsContent">
                <div class="flex justify-center items-center w-full h-full relative" @click.stop>
                    <!-- 关闭按钮 -->
                    <div @click="closeInvestmentHighlightsContent"
                        class="absolute top-[30px] right-[30px] bg-white/10 border border-white/30 text-white cursor-pointer p-3 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-[1001] hover:bg-white/20 hover:text-[#00d4ff] hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                    </div>

                    <div class="w-[95vw] h-[70vh] min-h-[780px] flex flex-col overflow-hidden">
                        <div
                            class="w-full h-full grid grid-cols-6 grid-rows-1 gap-2.5 justify-center content-center p-5">
                            <!-- 第一个项目 - 视频 -->
                            <div
                                class="relative flex flex-col items-center justify-start bg-black/10 rounded-none overflow-hidden transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,212,255,0.2)]">
                                <div
                                    class="relative w-full h-[350px] flex-shrink-0 block overflow-hidden mb-0 leading-[0]">
                                    <video :src="getWorkVideo(1)"
                                        class="w-full h-full block object-cover object-center transition-all duration-300 hover:scale-105"
                                        autoplay muted loop playsinline>
                                    </video>
                                </div>
                                <div
                                    class="flex-1 flex flex-col items-center text-center text-white px-2.5 py-[15px] w-full box-border mb-10 mt-[6vh]">
                                    <div
                                        class="text-white text-[20px] font-bold flex items-center justify-center mb-10">
                                        1</div>
                                    <div class="text-[20px] mb-2">The Definer of the Future – the 128-Meter Cultural Tourism Vessel</div>
                                    <div class="text-[18px] mb-1 text-white/70">Project: Wuhu Pearl</div>
                                    <div class="text-[18px] mb-1 text-white/70">Expected release date: May 2026</div>
                                    <div class="text-[18px] mb-1 text-white/70">Location: Wuhu, Anhui</div>
                                </div>
                            </div>

                            <!-- 第二个项目 - 视频 -->
                            <div
                                class="relative flex flex-col items-center justify-start bg-black/10 rounded-none overflow-hidden transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,212,255,0.2)]">
                                <div
                                    class="relative w-full h-[350px] flex-shrink-0 block overflow-hidden mb-0 leading-[0]">
                                    <video :src="getWorkVideo(2)"
                                        class="w-full h-full block object-cover object-center transition-all duration-300 hover:scale-105"
                                        autoplay muted loop playsinline>
                                    </video>
                                </div>
                                <div
                                    class="flex-1 flex flex-col items-center text-center text-white px-2.5 py-[15px] w-full box-border mb-10 mt-[6vh]">
                                    <div
                                        class="text-white text-[20px] font-bold flex items-center justify-center mb-10">
                                        2</div>
                                    <div class="text-[20px] mb-2">Definer of maritime cultural tourism vessels</div>
                                    <div class="text-[18px] mb-1 text-white/70">Project: Xunxian 1 and 2</div>
                                    <div class="text-[18px] mb-1 text-white/70">Landing Date: May 2017</div>
                                    <div class="text-[18px] mb-1 text-white/70">Location: Yantai, Qinhuangdao</div>
                                </div>
                            </div>

                            <!-- 第三个项目 - 图片 -->
                            <div
                                class="relative flex flex-col items-center justify-start bg-black/10 rounded-none overflow-hidden transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,212,255,0.2)]">
                                <div class="relative w-full h-[350px] flex-shrink-0 block mb-0 bg-cover bg-bottom bg-no-repeat transition-all duration-300 hover:scale-105"
                                    :style="{ backgroundImage: `url(${getWorkImage(3)})` }">
                                </div>
                                <div
                                    class="flex-1 flex flex-col items-center text-center text-white px-2.5 py-[15px] w-full box-border mb-10 mt-[6vh]">
                                    <div
                                        class="text-white text-[20px] font-bold flex items-center justify-center mb-10">
                                        3</div>
                                    <div class="text-[20px] mb-2">Rich resources on B-side and G-side</div>
                                    <div class="text-[18px] mb-1 text-white/70">Project: Jiuzhou Bay No. 1 (Nezha)</div>
                                    <div class="text-[18px] mb-1 text-white/70">Landing Date: October 2020</div>
                                    <div class="text-[18px] mb-1 text-white/70">Location: Zhuhai, Guangdong</div>
                                </div>
                            </div>

                            <!-- 第四个项目 - 视频 -->
                            <div
                                class="relative flex flex-col items-center justify-start bg-black/10 rounded-none overflow-hidden transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,212,255,0.2)]">
                                <div
                                    class="relative w-full h-[350px] flex-shrink-0 block overflow-hidden mb-0 leading-[0]">
                                    <video :src="getWorkVideo(4)"
                                        class="w-full h-full block object-cover object-center transition-all duration-300 hover:scale-105"
                                        autoplay muted loop playsinline>
                                    </video>
                                </div>
                                <div
                                    class="flex-1 flex flex-col items-center text-center text-white px-2.5 py-[15px] w-full box-border mb-10 mt-[6vh]">
                                    <div
                                        class="text-white text-[20px] font-bold flex items-center justify-center mb-10">
                                        4</div>
                                    <div class="text-[20px] mb-2">Pioneer of consumer transportation</div>
                                    <div class="text-[18px] mb-1 text-white/70">Project: Kun</div>
                                    <div class="text-[18px] mb-1 text-white/70">Landing Date: April 2024</div>
                                    <div class="text-[18px] mb-1 text-white/70">Location: Weihai, Shandong</div>
                                </div>
                            </div>

                            <!-- 第五个项目 - 视频 -->
                            <div
                                class="relative flex flex-col items-center justify-start bg-black/10 rounded-none overflow-hidden transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,212,255,0.2)]">
                                <div
                                    class="relative w-full h-[350px] flex-shrink-0 block overflow-hidden mb-0 leading-[0]">
                                    <video :src="getWorkVideo(5)"
                                        class="w-full h-full block object-cover object-center transition-all duration-300 hover:scale-105"
                                        autoplay muted loop playsinline>
                                    </video>
                                </div>
                                <div
                                    class="flex-1 flex flex-col items-center text-center text-white px-2.5 py-[15px] w-full box-border mb-10 mt-[6vh]">
                                    <div
                                        class="text-white text-[20px] font-bold flex items-center justify-center mb-10">
                                        5</div>
                                    <div class="text-[20px] mb-2">Complete domestic and overseas channel network</div>
                                    <div class="text-[18px] mb-1 text-white/70">Project: ADAMAS</div>
                                    <div class="text-[18px] mb-1 text-white/70">Launch Date: March 2025</div>
                                    <div class="text-[18px] mb-1 text-white/70">Location: Ho Chi Minh City, Vietnam
                                    </div>
                                </div>
                            </div>

                            <!-- 第六个项目 - 图片 -->
                            <div
                                class="relative flex flex-col items-center justify-start bg-black/10 rounded-none overflow-hidden transition-all duration-300 cursor-pointer h-full hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,212,255,0.2)]">
                                <!-- <div class="relative w-full h-[350px] block mb-0 bg-cover bg-bottom  bg-no-repeat transition-all duration-300 hover:scale-105"
                                     :style="{ backgroundImage: `url(${getWorkImage(6)})` }">
                                </div> -->
                                <div
                                    class="relative w-full h-[350px] flex-shrink-0 block overflow-hidden mb-0 leading-[0]">
                                    <video :src="getWorkVideo(6)"
                                        class="w-full h-full block object-cover object-center transition-all duration-300 hover:scale-105"
                                        autoplay muted loop playsinline>
                                    </video>
                                </div>
                                <div
                                    class="flex-1 flex flex-col text-center text-white px-2.5 py-[15px] w-full box-border mt-[6vh]">
                                    <div
                                        class="text-white text-[20px] font-bold flex items-center justify-center mb-10">
                                        6</div>
                                    <div class="text-[20px] mb-2">Designer of the country's first smart yacht</div>
                                    <!-- 文字部分 -->
                                    <div
                                        class="max-h-[180px] [@media(min-width:1920px)]:max-h-[230px] overflow-y-auto pb-10">
                                        <div class="text-[18px] mb-1 text-white/70">Project: Smart Boat No. 1</div>
                                        <div class="text-[18px] mb-1 text-white/70">Landing Date: October 2022</div>
                                        <div class="text-[18px] mb-1 text-white/70">Location: Guangdong-Hong Kong-Macao
                                            Greater Bay
                                            Area</div>
                                        <div class="text-[18px] mb-[3px] italic text-white/60">"Smart Yacht Interior
                                            Design
                                            Technology Research Report"</div>
                                        <div class="text-[18px] mb-[3px] italic text-white/60">"Smart Yacht Independent
                                            Development
                                            Project"</div>
                                        <div class="text-[18px] mb-[3px] italic text-white/60">"Research on Exterior and
                                            Interior
                                            Design Technology of Medium-Sized Luxury Cruise Ships"</div>
                                        <div class="text-[18px] mb-[3px] italic text-white/60">"2023 Forward-Looking
                                            Research
                                            Project"</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 过往经历 -->
            <div v-if="showPastExperienceContent"
                class="fixed inset-0 bg-black/70 backdrop-blur-[10px] z-[1000] flex justify-center items-center p-5">
                <div class="absolute top-[30px] right-[30px] bg-white/10 border border-white/30 text-white cursor-pointer p-3 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-[1001] hover:bg-white/20 hover:text-[#00d4ff] hover:scale-110"
                    @click="closePastExperienceContent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
                <div class="w-full h-full overflow-hidden relative">
                    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                        <p class="text-[30px] font-bold text-white">Past Experience</p>
                    </div>
                    <div class="flex flex-col items-center justify-center h-full w-full px-2 relative">
                        <div v-if="pastExperienceSlides.length" class="relative w-full flex items-center justify-center overflow-hidden" style="flex: 1; display: flex; align-items: center; justify-content: center;">
                            <swiper
                                ref="pastExperienceSwiperRef"
                                :modules="pastExperienceSwiperModules"
                                :slides-per-view="'auto'"
                                :centered-slides="true"
                                :space-between="80"
                                
                                :loop-additional-slides="3"
                                :looped-slides="pastExperienceSlides.length"
                                :watch-overflow="false"
                                :speed="500"
                                :pagination="{
                                    el: '.past-experience-pagination',
                                    clickable: true,
                                    type: 'bullets'
                                }"
                                @swiper="onPastExperienceSwiper"
                                @slideChange="onPastExperienceSlideChange"
                                :breakpoints="{
                                    320: { slidesPerView: 'auto', spaceBetween: 30, loopAdditionalSlides: 2 },
                                    768: { slidesPerView: 'auto', spaceBetween: 80, loopAdditionalSlides: 3 }
                                }"
                                class="past-experience-swiper w-full">
                                <swiper-slide
                                    v-for="(slide, index) in pastExperienceSlides"
                                    :key="slide.id"
                                    class="past-experience-slide">
                                    <div
                                        @click="goToPastExperienceSlide(index)"
                                        class="cursor-pointer w-full h-full relative overflow-hidden transition-all duration-500 past-experience-slide-content">
                                        <img 
                                            :src="slide.image" 
                                            :alt="slide.title"
                                            class="w-full object-contain select-none"
                                            draggable="false"
                                        />
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div v-else class="flex items-center justify-center text-white/70 text-center p-6">
                            Image assets are loading...
                        </div>
                    </div>
                    <!-- 指示点 - 相对于最外层容器居中 -->
                    <div v-if="pastExperienceSlides.length" class="past-experience-pagination absolute bottom-[150px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed, watch, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import CEOPng from '../assets/team/1.jpg'
import COOPng from '../assets/team/2.png'
import CFO from '../assets/team/4.png'
import EngineerPng from '../assets/team/3.png'
import qiang from '../assets/team/5.png'
import Jeff from '../assets/team/6.jpg'
import zhiliao from '../assets/team/7.jpg'
import PastExp1 from '../assets/team/guan/1.png'
import PastExp2 from '../assets/team/guan/2.png'
import PastExp3 from '../assets/team/guan/3.png'
import PastExp4 from '../assets/team/guan/4.png'
import PastExp5 from '../assets/team/guan/5.png'
import PastExp6 from '../assets/team/guan/6.png'
import PastExp7 from '../assets/team/guan/7.png'
import PastExp8 from '../assets/team/guan/8.png'
import PastExp9 from '../assets/team/guan/9.png'
import TopNavigation from '../components/TopNavigation.vue';

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
        professionalQualifications: '1. Bachelor of Industrial Design, China Academy of Art; 2. Master of Ship and Yacht Design, University of Genoa, Italy; 3. PhD in Marine Engineering Technology, University of Kuala Lumpur, Malaysia; 4. Over 10 years of experience in ship design; 5. Quality Control and After-Sales Manager, Ferretti Group, Italy (2015-2017); 6. Faculty Member, Department of Industrial Design, School of Design, China Academy of Art (October 2020-October 2022); 7. Currently General Manager/Legal Representative of Hangzhou YiHai Ship Design Co., Ltd. and Zhuhai YiHai Ship Design Co., Ltd.',
        areasOfExpertise: '1. Ship and Yacht Design (Exterior and Interior) 2. Industrial and Transportation Vehicle Styling Design 3. 3D Modeling and Rendering (Rhinoceros, KeyShot, Cinema 4D, etc.) 4. User Experience and Sustainable Design Teaching 5. Corporate Strategy and Design Management',
        introduction: 'He possesses extensive experience in ship, yacht, and industrial design, combining artistic creativity with an engineering background. After graduating from the China Academy of Art, he pursued further studies at the University of Genoa in Italy and the University of Kuala Lumpur in Malaysia, specializing in ship and yacht design and marine engineering technology. He previously served as Quality Control and After-Sales Manager at the Ferretti Group in Italy, and later founded an Italian ship design company, leading numerous yacht and cruise ship projects, with his work winning numerous international awards. In addition to corporate management, he also serves as a university lecturer, dedicated to cultivating innovative design talent, integrating aesthetics and practicality, and promoting Chinese ship design on the international stage.'
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
        name: '郑志彦',
        enName: 'Zheng Zhiyan',
        role: 'SP',
        image: zhiliao,
        description: '• Analyze industry trends and competitor dynamics • Participate in business negotiations, sign sales contracts, and ensure their execution • Expand new customers, maintain key customer relationships, and promote long-term cooperation',
        professionalQualifications: `1. Graduated in 2010 from the International Economics and Trade program at South China Agricultural University, Zhujiang College (Bachelor's degree). 2. Possesses over 15 years of experience in the high-end industry and yacht sector, including over 10 years of experience in sales and marketing management for high-end luxury brands. 3. Currently serves as co-founder and general manager of Shenzhen Tingyouqu Technology Co., Ltd., responsible for corporate strategic planning, market expansion, and brand building. 4. Previously served as Senior Client Director at Hainan Haitianshengyan Exhibition Co., Ltd., and Sales Director at Shenzhen Haizhilan Yacht Service Co., Ltd.`,
        areasOfExpertise: '1. Yacht Industry and High-End Market Operations: Possess extensive yacht industry resources and business ecosystem insights, and be familiar with yacht sales, brand promotion, investment strategies, and customer service systems. 2. Market Strategy and Brand Management: Expertise in developing marketing and public relations strategies, with the ability to integrate resources, shape brand image, and drive performance growth. 3. Customer Relationships and Business Development: Long-term service to high-end client groups, with expertise in key account management, negotiation, and channel development, and possessing exceptional communication and leadership skills. 4. Business Management and Strategic Execution: Founded the "Ting Youqu" platform from scratch, achieving success from startup to profitability, demonstrating exceptional strategic thinking and team execution.',
        introduction: 'Zheng Zhiyan, a graduate of Zhujiang College of South China Agricultural University with a degree in International Economics and Trade, is currently the co-founder and General Manager of Shenzhen Tingyouqu Technology Co., Ltd., with over 15 years of experience in the yacht and high-end industries. He initially worked for international freight forwarding companies DHL and Senator, accumulating a background in international trade and logistics. He later transitioned to the yacht industry, serving as Sales Director of Ocean Blue Yachts and Senior Account Director of Hai Tian Sheng Yan, delving into luxury brand marketing and high-end customer service. In 2019, he founded the "Tingyouqu" yacht industry platform, which achieved profitability and secured capital support within just two years. With extensive experience in yacht sales, marketing planning, branding, and business operations, Zheng Zhiyan is a high-end market operations expert who combines strategic vision with practical skills.',
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
        name: '刘胤霆',
        enName: 'Jeff',
        role: 'SE',
        image: Jeff,
        description: '• Multi physics modeling and simulation • Research and development of intelligent control algorithms • High end equipment system integration',
        professionalQualifications: '1: Graduated from South China University of Technology (Bachelor of Engineering) in Mechanical Engineering in 2023, GPA 3.2/4 2: Currently studying for a Master of Mechanical Engineering (Automotive and Racing Engineering) at Politecnico di Milano, Italy, GPA 23/30 3: Language proficiency: Chinese (native), English (IELTS 7.5), Italian (A2) 4: Proficient in engineering software such as MATLAB, SolidWorks, Ansys Fluent, AutoCAD, Python, and Adams Car 5: Experienced in electric vehicle and aerodynamics research, having won second prize in the China University Student Electric Formula Competition',
        areasOfExpertise: '1. Mechanical and Vehicle Engineering Design: Proficient in mechanical system design, transmission and power structure analysis, and CAD/CAE modeling and simulation. 2. Fluid and Aerodynamic Analysis: Familiar with CFD-based aerodynamic simulation and able to optimize vehicle aerodynamic performance using Ansys Fluent. 3. Electric and Hybrid System Design: Experienced in designing DC-DC power systems and emergency braking (EBS) systems; familiar with electric vehicle control logic and electrical safety architecture. 4. Multidisciplinary Collaborative Modeling and Verification: Able to combine theoretical mechanics, vehicle dynamics, and engineering simulation to complete virtual testing and performance analysis of complex mechanical systems.',
        introduction: `A mechanical engineer, currently pursuing a Master's degree in Automotive and Motorsports Engineering at the Polytechnic University of Milan, Italy. During his time at South China University of Technology, he served as a member of the electronic control team for a Formula E racing team, leading the development of DC-DC power conversion and EBS safety systems; the project won a second-place national award. His research focuses on vehicle aerodynamics and hybrid power system optimization. He is skilled in using CFD technology to analyze ground effects and vehicle aerodynamic performance, and possesses a deep understanding of improving energy efficiency in vehicle design. Liu Yinting combines a solid foundation in engineering theory with an international research perspective, enabling him to conduct mechanical and vehicle engineering design with a systematic approach, providing innovative solutions for intelligent and green transportation.`,
    }
])

interface PastExperienceSlide {
    id: number
    title: string
    description: string
    image: string
}

const pastExperienceSlides: PastExperienceSlide[] = [
    {
        id: 1,
        title: 'Hydrofoil Concept Review',
        description: 'Hangzhou · 2021',
        image: PastExp1
    },
    {
        id: 2,
        title: 'Interior Styling Workshop',
        description: 'Zhuhai · 2021',
        image: PastExp2
    },
    {
        id: 3,
        title: 'Luxury Cabin Mock-up',
        description: 'Shenzhen · 2022',
        image: PastExp3
    },
    {
        id: 4,
        title: 'Sea Trial Preparation',
        description: 'Hainan · 2022',
        image: PastExp4
    },
    {
        id: 5,
        title: 'Smart Yacht Delivery',
        description: 'Guangzhou · 2022',
        image: PastExp5
    },
    {
        id: 6,
        title: 'Material & Detail Study',
        description: 'Shanghai · 2023',
        image: PastExp6
    },
    {
        id: 7,
        title: 'Owner Experience Session',
        description: 'Hong Kong · 2023',
        image: PastExp7
    },
    {
        id: 8,
        title: 'Open Sea Validation',
        description: 'Ho Chi Minh City · 2024',
        image: PastExp8
    },
    {
        id: 9,
        title: 'Final Acceptance Ceremony',
        description: 'Milano · 2024',
        image: PastExp9
    }
]

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

// Past Experience 内容显示状态
const showPastExperienceContent = ref(false)

const pastExperienceIndex = ref(0)
const pastExperienceSwiperRef = ref<any>(null)

// Swiper 模块
const pastExperienceSwiperModules = [Pagination]

// Past Experience Swiper 实例初始化
const onPastExperienceSwiper = (swiper: any) => {
    pastExperienceSwiperRef.value = swiper
    // 确保允许滑动，即使所有图片都可见
    if (swiper) {
        swiper.allowSlideNext = true
        swiper.allowSlidePrev = true
    }
}

// Past Experience 选择幻灯片
const goToPastExperienceSlide = (index: number) => {
    if (pastExperienceSwiperRef.value && index >= 0 && index < pastExperienceSlides.length) {
        // 在循环模式下，使用 slideToLoop 方法
        pastExperienceSwiperRef.value.slideToLoop(index)
    }
}

// Past Experience 幻灯片切换事件
const onPastExperienceSlideChange = (swiper: any) => {
    // 使用 realIndex 获取真实的索引（循环模式下的实际索引）
    pastExperienceIndex.value = swiper.realIndex
    // Swiper 会自动更新 pagination 状态，不需要手动操作
}

// Past Experience Pagination 渲染后处理
const onPastExperiencePaginationRender = (swiper: any, paginationEl: HTMLElement) => {
    // 确保允许滑动，即使所有图片都可见
    if (swiper) {
        swiper.allowSlideNext = true
        swiper.allowSlidePrev = true
    }
    // 不拦截点击事件，让 Swiper 自己处理
}

// Past Experience Pagination 更新事件
const onPastExperiencePaginationUpdate = (swiper: any, paginationEl: HTMLElement) => {
    // 确保允许滑动
    if (swiper) {
        swiper.allowSlideNext = true
        swiper.allowSlidePrev = true
    }
    // 不在 paginationUpdate 中添加事件监听器，避免重复添加
    // 事件监听器只在 paginationRender 中添加一次
}

// 监听弹窗打开，初始化 Swiper
watch(showPastExperienceContent, (visible) => {
    if (visible) {
        // 使用 nextTick 确保 Swiper 已经初始化
        nextTick(() => {
            if (pastExperienceSwiperRef.value) {
                // 确保允许滑动，即使所有图片都可见
                pastExperienceSwiperRef.value.allowSlideNext = true
                pastExperienceSwiperRef.value.allowSlidePrev = true
                // 重置到第一张图片
                pastExperienceSwiperRef.value.slideToLoop(0, 0)
                pastExperienceIndex.value = 0
            }
        })
    }
})




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

// 滑动切换成员（基于当前位置，避免回退）
const swipeToMember = (direction: 'next' | 'previous', currentPosition?: number) => {
    const groupLength = teamMembers.value.length * CARD_TOTAL_WIDTH
    const lastIndex = teamMembers.value.length - 1
    const currentIndex = selectedIndex.value

    // 使用传入的当前位置，如果没有则使用 scrollPosition
    const actualCurrentPosition = currentPosition ?? scrollPosition.value

    let targetIndex: number
    let targetPosition: number

    if (direction === 'next') {
        if (currentIndex === lastIndex) {
            // 从最后一张切换到第一张（循环）
            targetIndex = 0
            targetPosition = groupLength // 先移动到第二组的第一张
        } else {
            targetIndex = currentIndex + 1
            // 基于实际当前位置计算目标位置，确保平滑过渡
            targetPosition = targetIndex * CARD_TOTAL_WIDTH
        }
    } else {
        // previous
        if (currentIndex === 0) {
            // 从第一张切换到最后一张（循环）
            targetIndex = lastIndex
            targetPosition = groupLength + lastIndex * CARD_TOTAL_WIDTH // 先移动到第二组的最后一张
        } else {
            targetIndex = currentIndex - 1
            // 基于实际当前位置计算目标位置，确保平滑过渡
            targetPosition = targetIndex * CARD_TOTAL_WIDTH
        }
    }

    selectedIndex.value = targetIndex

    // 如果是循环切换，需要特殊处理
    if ((direction === 'next' && currentIndex === lastIndex) ||
        (direction === 'previous' && currentIndex === 0)) {
        const container = document.querySelector('.flex.transition-transform') as HTMLElement

        // 先平滑过渡到第二组
        scrollPosition.value = targetPosition

        // 等待动画完成后，重置到第一组对应位置
        setTimeout(() => {
            if (container) {
                container.style.transition = 'none'
                container.style.transform = ''
            }
            // 重置到第一组对应位置
            scrollPosition.value = targetIndex * CARD_TOTAL_WIDTH
            setTimeout(() => {
                if (container) {
                    container.style.transition = 'transform 500ms ease-in-out'
                }
            }, 50)
        }, 500)
    } else {
        // 正常切换，直接更新到目标位置
        scrollPosition.value = targetPosition
    }
}

// 处理卡片点击
const handleCardClick = (index: number) => {
    selectMemberByClick(index)
}

// 选择成员（点击方式）
const selectMemberByClick = (index: number) => {
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

// Past Experience 控制函数
function showPastExperienceModal() {
    showWhoWeAreContent.value = false
    showInvestmentHighlightsContent.value = false
    showPastExperienceContent.value = true
}

function closePastExperienceContent() {
    showPastExperienceContent.value = false
}

function closeInvestmentHighlightsContent() {
    showInvestmentHighlightsContent.value = false
}

// 获取作品图片路径
function getWorkImage(index: number) {
    return new URL(`../assets/work${index}.gif`, import.meta.url).href
}

// 获取作品视频路径
function getWorkVideo(index: number) {
    return new URL(`../assets/work${index}.mp4`, import.meta.url).href
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
/* Tailwind animation for fadeIn effect */
@keyframes fadeIn {
    from {
        opacity: 0;
        backdrop-filter: blur(0px);
    }

    to {
        opacity: 1;
        backdrop-filter: blur(20px);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
}

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
    padding: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
    .info-frame {
        padding: 16px;
    }
}

@media (min-width: 1024px) {
    .info-frame {
        padding: 20px;
    }
}

@media (min-width: 1536px) {
    .info-frame {
        padding: 20px;
    }
}

.info-frame:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}

.info-title {
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    margin: 0;
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    height: 100%;
}

.works-image-item:hover {
    transform: scale(1.02);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.works-image-wrapper {
    position: relative;
    width: 100%;
    display: block;
    overflow: hidden;
    margin-bottom: 0;
    line-height: 0;
}

.works-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: top;
    transition: all 0.3s ease;
}

.works-image-item:hover .works-image {
    transform: scale(1.05);
}

.works-number {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

/* 文字内容区域 */
.works-text-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    color: white;
    padding: 15px 10px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 0;
}

.works-title {
    font-size: 14px;
    margin-bottom: 8px;
    line-height: 1.3;
    font-weight: 600;
}

.works-project,
.works-date,
.works-location {
    font-size: 12px;
    margin-bottom: 4px;
    opacity: 0.9;
}

.works-extra {
    font-size: 10px;
    margin-bottom: 3px;
    font-style: italic;
    color: white;
    opacity: 0.8;
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

    .works-text-content {
        padding: 10px 5px;
    }

    .works-title {
        font-size: 12px;
        margin-bottom: 5px;
    }

    .works-project,
    .works-date,
    .works-location {
        font-size: 10px;
        margin-bottom: 3px;
    }

    .works-extra {
        font-size: 9px;
        margin-bottom: 2px;
    }
}

/* 防止文本溢出和滚动条 */
.break-words {
    word-break: break-word;
    overflow-wrap: break-word;
}

.overflow-wrap-anywhere {
    overflow-wrap: anywhere;
    word-break: break-word;
}

/* 确保flex容器不会溢出 */
.min-w-0 {
    min-width: 0;
}

/* 拖拽时禁用过渡效果 */
.transition-none {
    transition: none !important;
}

/* 轮播容器样式 */
.carousel-container {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: grab;
}

.carousel-container:active {
    cursor: grabbing;
}

/* Past Experience Swiper 样式 */
.past-experience-swiper {
    padding: 0;
    width: 100%;
    display: flex !important;
    align-items: center !important;
}

.past-experience-swiper :deep(.swiper-wrapper) {
    display: flex !important;
    align-items: center !important;
}

/* Past Experience Slide 样式 */
.past-experience-slide {
    width: 450px !important;
    transition: width 0.5s ease;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.past-experience-slide.swiper-slide-active {
    width: 700px !important;
}

.past-experience-slide-content {
    width: 100%;
    height: 500px;
    transform: scale(1);
    transition: all 0.5s ease;
    /* border-radius: 1rem !important; */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.past-experience-slide.swiper-slide-active .past-experience-slide-content {
    height: 850px;
    transform: scale(1.1);
    border-radius: 1rem !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .past-experience-slide {
        width: 200px !important;
    }
    
    .past-experience-slide.swiper-slide-active {
        width: 300px !important;
    }
    
    .past-experience-slide-content {
        height: 280px;
    }
    
    .past-experience-slide.swiper-slide-active .past-experience-slide-content {
        height: 450px;
    }
}

/* Pagination 容器样式 */
.past-experience-pagination {
    position: fixed !important;
    bottom: 150px !important;
    left: 50vw !important;
    transform: translateX(-50%) !important;
    z-index: 1010 !important;
    width: auto !important;
    max-width: none !important;
}

.past-experience-pagination :deep(.swiper-pagination-bullet) {
    width: 16px !important;
    height: 4px !important;
    border-radius: 2px !important;
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
    transition: all 0.3s ease !important;
    margin: 0 4px !important;
    display: inline-block !important;
}

.past-experience-pagination :deep(.swiper-pagination-bullet-active) {
    width: 40px !important;
    background: #00d4ff !important;
    opacity: 1 !important;
}
</style>
