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

				<router-link to="/industry-background" class="nav-item">Industry Background</router-link>
				<div class="nav-divider"></div>
				<router-link to="/market-demand" class="nav-item">Market Demand</router-link>
				<div class="nav-divider"></div>
				<router-link to="/business-model" class="nav-item">Business Model</router-link>
				<div class="nav-divider"></div>
				<div class="nav-item active">Team Composition</div>
				<div class="nav-divider"></div>
				<router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
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
						<div class="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
						</div>
					</div>

					<!-- 姓名与职位 -->
					<div class="absolute left-20 top-1/4 z-20">
						<span class="font-bold text-white tracking-wider text-[36px] font-[Times_New_Roman] transition-all duration-500">
							{{ selectedMember.enName }}
                        </span>
					</div>
					<div class="absolute left-20 bottom-1/4 z-20">
						<h2 class="text-[64px] font-bold text-white tracking-wider font-[Times_New_Roman] transition-all duration-500">
							{{ selectedMember.role }}
						</h2>
					</div>
				</div>

				<!-- 右侧内容区域 -->
				<div class="w-[64%] bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col justify-between">
					<div class="flex flex-col h-full">
						<!-- 成员介绍区域 -->
						<div class="px-12 py-10 overflow-y-auto 2xl:h-[560px] xl:h-[400px]">
							<div class="max-w-4xl">
								<!-- 经历部分 (只有吴关和龚亮显示) -->
								<div v-if="selectedMember.name === '吴关' || selectedMember.name === '龚亮'" class="2xl:mb-10 mb-6">
									<span class="text-xl text-white mb-4 flex items-center">
										<span class="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
										Experience
                                    </span>
									<div class="pl-5 space-y-2">
										<div v-for="(item, index) in formatListItems(selectedMember.professionalQualifications)"
											:key="`qual-${index}`"
											class="flex items-start group">
											<span class="text-white/70 mr-3 mt-1.5 text-xs">▸</span>
											<p class="text-white/90 text-base leading-relaxed flex-1 group-hover:text-white transition-colors">
												{{ item }}
											</p>
										</div>
									</div>
								</div>

								<!-- 专长领域部分 (只有非吴关和非龚亮显示) -->
								<div v-if="selectedMember.name !== '吴关' && selectedMember.name !== '龚亮'" class="2xl:mb-10 mb-6">
									<span class="text-xl text-white mb-4 flex items-center">
										<span class="w-2 h-2 bg-white/60 rounded-full mr-3"></span>
										Areas of expertise
									</span>
									<div class="pl-5 bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
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
						</div>

						<!-- 底部团队轮播区域 -->
						<div class="border-gray-200 px-12 py-8">
							<!-- 标题 -->
							<div class="flex items-center justify-between mb-6">
								<h3 class="text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Y-H2O Team</h3>
							</div>

							<!-- 履带式轮播容器 -->
							<div class="relative w-full px-4 overflow-hidden">
								<div class="flex transition-transform duration-500 ease-in-out"
									:style="{ transform: `translateX(-${scrollPosition}px)` }">
									<!-- 单一卡片组，使用两次循环实现无限滚动效果 -->
									<template v-for="cycle in 2" :key="cycle">
										<div v-for="(member, index) in teamMembers"
											:key="`${cycle}-${index}`"
											@click="selectMember(index)"
											:class="[
												'rounded-2xl p-4 cursor-pointer group flex-shrink-0 relative overflow-hidden border-white/20 mr-[30px] bg-cover bg-center ',
												selectedIndex === index ? 'h-[360px]' : 'h-[320px]'
											]"
											:style="{
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
								<button @click="previousMember"
									class="cursor-pointer rounded-full text-gray-500 bg-white/50 hover:bg-black/70 transition-all duration-300 shadow-lg hover:shadow-sm transform hover:scale-105">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
									</svg>
								</button>

								<button @click="nextMember"
									class="cursor-pointer rounded-full text-gray-500 bg-white/50 hover:bg-black/70 transition-all duration-300 shadow-lg hover:shadow-sm transform hover:scale-105">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
									</svg>
								</button>

								<!-- 公司名称 -->
								<div class="absolute left-[calc(50%+370px)]">
									<h2 class="text-2xl text-white">Y-H2O</h2>
								</div>
							</div>
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
import zhiliao from '../assets/team/7.png' 
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
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
}

.home-btn:hover {
	background: rgba(0, 212, 255, 0.2);
	transform: scale(1.1);
}

.home-icon {
	width: 20px;
	height: 20px;
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
button:focus, button:focus-visible {
    outline: none;
}
button {
    background-color: rgba(255,255,255,0.8);
}
</style>
