<template>
	<div class="business-model">
		<!-- 前置覆盖层 -->
		<div class="overlay-mask bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900" v-if="showOverlay">
			<!-- 初始方块 - 对角线分割 -->
			<div class="overlay-blocks" v-if="!showCContent && !showBContent">
				<!-- 内层矩形容器 -->
				<div class="overlay-inner-container">
					<!-- B区域 - 左侧 -->
					<div class="region-b-left" @click="showBContentPanel">
						<div class="region-content">
							<div class="region-label text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px]">B
							</div>
							<div class="region-text text-lg sm:text-xl md:text-2xl">Business</div>
						</div>
					</div>
					<!-- C区域 - 右侧 -->
					<div class="region-c-right" @click="showCContentPanel">
						<div class="region-content">
							<div class="region-label text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px]">C
							</div>
							<div class="region-text text-lg sm:text-xl md:text-2xl">Consumer</div>
						</div>
					</div>
					<!-- 中间分割线 -->
					<div class="center-divider"></div>
					<!-- 中间圆形商业模式 -->
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer pointer-events-auto"
						@click="showFinancialModal = true">

						<div
							class="group flex flex-col items-center justify-center gap-5 p-8 bg-black/30 backdrop-blur-[20px] backdrop-saturate-120 rounded-full w-[320px] h-[320px] md:w-[300px] md:h-[300px] md:p-7 md:gap-4 sm:w-[260px] sm:h-[260px] sm:p-6 sm:gap-3 border-2 border-white/20 transition-all duration-500 ease-in-out shadow-[0_0_30px_rgba(0,212,255,0.3),0_0_60px_rgba(0,212,255,0.2),inset_0_0_20px_rgba(0,212,255,0.1)] hover:scale-110 hover:border-[rgba(0,212,255,0.6)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5),0_0_80px_rgba(0,212,255,0.3),inset_0_0_30px_rgba(0,212,255,0.2)] hover:bg-black/40">
							<div class="region-label text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px]">
								F
							</div>
							<div
								class="text-lg sm:text-xl md:text-2xl font-medium text-white/90 uppercase tracking-[2px] md:tracking-[1.5px] sm:tracking-[0.5px] text-center leading-tight transition-all duration-300 ease-in-out [text-shadow:0_0_10px_rgba(0,212,255,0.5),0_0_20px_rgba(0,212,255,0.3)] group-hover:text-white group-hover:tracking-[3px] group-hover:[text-shadow:0_0_15px_rgba(0,212,255,0.8),0_0_30px_rgba(0,212,255,0.5)]">
								<div>Financial</div>
								<div>Model</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- C方块的内容面板 - 全屏 -->
			<div class="c-content-panel" v-if="showCContent">
				<!-- 关闭按钮 -->
				<button @click="backToBlocks"
					class="button-focus absolute top-2 md:top-4 right-2 md:right-4 text-gray-300 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-2 md:p-2 z-50 transition-all duration-300 group">
					<img src="../assets/icon-17.png" alt="返回" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
				</button>

				<!-- 内容 -->
				<div class="c-content-wrapper">
					<!-- 图片左上角 -->
					<div class="content-section top-left">
						<h3
							class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
							High-end events such as competitions</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Participate in
							or sponsor high-end water sports events; <br />organize product appreciation events and
							water driving experience days.</p>
					</div>
					<!-- 图片左下角 -->
					<div class="content-section bottom-left">
						<h3
							class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
							Online platforms and digital touchpoints</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Official
							independent website (brand story/technical details/online test drive booking)<br />Social
							media matrix: Instagram/YouTube/TikTok</p>
					</div>
					<!-- 中间图片 -->
					<div class="center-image-container">
						<img src="../assets/c_clinet_bg.png" alt="Hydrofoil Boat" class="center-image">
					</div>
					<!-- 图片右上角 -->
					<div class="content-section top-right">
						<h3
							class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
							Industry exhibitions and media</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Participate in
							mainstream yacht shows<br />Yacht industry association platform exposed</br>Leading industry
							media/KOL cooperation</p>
					</div>
					<!-- 图片右下角 -->
					<div class="content-section bottom-right">
						<h3
							class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
							Offline sales network</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Overseas
							Sales/Partnerships: <br />Establishing partnerships with internationally renowned yacht
							dealers<br />Domestic channels: <br />Establish a presence in high-end yacht clubs and
							collaborate with upscale tourist resorts.</p>
					</div>
				</div>
			</div>

			<!-- B方块的内容面板 - 全屏 -->
			<div class="b-content-panel" v-if="showBContent">
				<!-- 关闭按钮 -->
				<button @click="backToBlocks"
					class="button-focus absolute top-8 md:top-30 right-8 md:right-4 text-gray-300 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-2 md:p-2 z-50 transition-all duration-300 group">
					<img src="../assets/icon-17.png" alt="返回" class="w-6 h-6">
				</button>

				<!-- B方块显示主要内容 -->
				<div class="main-content">
					<!-- 左侧面板：Revenue Model + Channel Strategy -->
					<div ref="leftPanelRef" class="left-panel mt-16 md:mt-20">
						<!-- 渠道策略 -->
						<div
							class="strategy-card bg-white/5 backdrop-blur-[30px] border border-white/15 rounded-xl p-6 shadow-xl">
							<h3 class="strategy-title text-[36px] font-semibold text-white mb-4">Channel Strategy</h3>
							<div class="border-b-2 border-white mb-6"></div>

							<div class="strategy-section pb-6 mb-6 border-b-2 border-white">
								<div class="strategy-subtitle flex items-baseline gap-3 mb-5">
									<span class="text-6xl font-light text-white leading-none">01</span>
									<span class="text-slate-400/40 text-6xl font-light">/</span>
									<span class="text-[24px] text-white font-medium">Domestic (B-end water area
										operator)</span>
								</div>
								<div class="strategy-content ml-[22px]">
									<p class="strategy-label text-[20px] font-semibold text-white mb-2">Positioning:</p>
									<p class="strategy-text text-[18px] text-white/90 mb-4 leading-relaxed">To provide a
										full cycle hydrofoil operation
										solution for
										scenic
										spots, passenger transport companies, and hotels.</p>

									<p class="strategy-label text-[20px] font-semibold text-white mb-2">Core module:</p>
									<p class="strategy-text text-[18px] text-white/90 mb-2 leading-relaxed">Fleet
										operation and maintenance (equipment
										support)+safety
										management (real-time monitoring)</p>
									<p class="strategy-text text-[18px] text-white/90 leading-relaxed">Product operation
										(leasing system)+dock support
										(infrastructure
										support)</p>
								</div>
							</div>

							<div class="strategy-section">
								<div class="strategy-subtitle flex items-baseline gap-3 mb-5">
									<span class="text-6xl font-light text-white leading-none">02</span>
									<span class="text-slate-400/40 text-6xl font-light">/</span>
									<span class="text-[24px] text-white font-medium">Overseas business (C-end private
										enterprises/private berth
										users)</span>
								</div>
								<div class="strategy-content ml-[22px]">
									<p class="strategy-label text-[20px] font-semibold text-white mb-2">Positioning:</p>
									<p class="strategy-text text-[18px] text-white/90 mb-4 leading-relaxed">To build an
										intelligent hydrofoil boat
										lifestyle ecosystem
										for
										middle-class private berth users.</p>

									<p class="strategy-label text-[20px] font-semibold text-white mb-2">Core module:</p>
									<p class="strategy-text text-[18px] text-white/90 mb-2 leading-relaxed">Map service
										(navigation planning)+APP service
										(remote
										control)</p>
									<p class="strategy-text text-[18px] text-white/90 leading-relaxed">Additional
										services (customized
										maintenance/social
										functions)</p>
								</div>
							</div>
						</div>
					</div>

					<!-- 右侧面板：详细内容 -->
					<div ref="rightPanelRef" class="right-panel -mt-[100px]">
						<!-- 内容面板 -->
						<div class="content-panel w-full bg-white/5 rounded-[10px] backdrop-blur-[30px]"
							v-if="activeContent && activeContent !== 'revenue'">
							<!-- Lake Como 案例内容 -->
							<div v-if="activeContent === 'lake' && !showLakeDetail" class="lake-content"
								@click="toggleEchart">
								<div class="content-title text-[36px] mb-[10.67px]">The case of Lake Como</div>
								<div class="content-subtitle text-[24px] mb-[26.67px]">Daily average number of tourists
								</div>

								<!-- ECharts 圆环图 -->
								<div v-if="!showDemandChart" class="pie-chart-container">
									<div ref="pieChartRef" class="pie-chart-echarts"></div>
								</div>
								
								<!-- ECharts 半环形图 -->
								<div v-if="showDemandChart" class="demand-chart-container">
									<div ref="demandChartRef" class="demand-chart-echarts"></div>
									<!-- 引导线连接的文字 -->
									<div class="chart-labels">
										<div class="chart-label-left">
											<div class="label-text text-[18px]">Daily transportation demand</div>
											<div class="label-text text-[18px]">in the lake area</div>
										</div>
										<div class="chart-label-right">
											<div class="label-text text-[18px]">Connection
												Requirements</div>
										</div>
										<div class="chart-label-bottom">
											<div class="label-text text-[18px]">Other
												Requirements</div>
										</div>
									</div>
								</div>

								<!-- 描述文字 - 根据echart切换 -->
								<p v-if="!showDemandChart" class="description-text text-[18px] my-[26.67px]">
									Each hotel has an average of 100 rooms, totaling 400 rooms, calculated based on the
									number
									of tourists during the off-season.
								</p>
								
								<!-- 描述文字 - 半环形图 -->
								<div v-if="showDemandChart" class="demand-description my-[26.67px]">
									<p class="text-[18px]">Each ship has a passenger capacity of 4 people</p>
									<p class="text-[18px]">The total demand for hydrofoil boats is 25-38</p>
								</div>

								<!-- 柱状图 -->
								<div class="bar-charts my-[26.67px]">
									<div class="bar-row">
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
									</div>
									<div class="bar-row">
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
									</div>
									<div class="bar-row">
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item filled w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
										<div class="bar-item empty w-[16px] h-[16px]"></div>
									</div>
								</div>

								<!-- 图例 -->
								<div class="legend">
									<div class="legend-item">
										<span class="legend-label text-[18px]">Daily average number of tourists</span>
										<span class="legend-value text-[18px]">10000 people</span>
									</div>
									<div class="legend-item">
										<span class="legend-label text-[18px]">Hotel load capacity</span>
										<span class="legend-value text-[18px]">1200 people</span>
									</div>
									<div class="legend-item">
										<span class="legend-label text-[18px]">Overnight tourists (50% occupancy
											rate)</span>
										<span class="legend-value text-[18px]">400-600 people</span>
									</div>
								</div>
							</div>

							<!-- Lake详情面板 -->
							<div v-if="activeContent === 'lake' && showLakeDetail" class="lake-content"
								@click="hideContent">
								<!-- Transportation Demand 部分 -->
								<div class="transportation-demand-section">
									<div class="main-title text-[24px] mb-[13px]">Daily average
										number of boat tourists</div>
									<div class="section-title text-[20px] mb-[13px]">Transportation Demand</div>

									<!-- ECharts 半环形图 -->
									<div class="demand-chart-container">
										<div ref="demandChartRef" class="demand-chart-echarts"></div>
										<!-- 引导线连接的文字 -->
										<div class="chart-labels">
											<div class="chart-label-left">
												<div class="label-text text-[18px]">Daily transportation demand</div>
												<div class="label-text text-[18px]">in the lake area</div>
											</div>
											<div class="chart-label-right">
												<div class="label-text text-[18px]">Connection
													Requirements</div>
											</div>
											<div class="chart-label-bottom">
												<div class="label-text text-[18px]">Other
													Requirements</div>
											</div>
										</div>
									</div>
									<!-- 描述文字 -->
									<div class="demand-description">
										<p class="text-[18px]">Each ship has a passenger capacity
											of 4 people</p>
										<p class="text-[18px]">The total demand for hydrofoil
											boats is 25-38</p>
									</div>
								</div>

								<!-- 游客数据部分 -->
								<div class="tourist-data-section mt-[12px]">
									<div class="section-title text-[20px] mb-[13px]">The daily average number of tourists taking
										boats on Lake
										Como,
										calculated based on the peak and off peak seasons</div>

									<!-- 柱状图 -->
									<div class="bar-charts my-[26.67px]">
										<div class="bar-row">
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
										</div>
										<div class="bar-row">
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
										</div>
										<div class="bar-row">
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
										</div>
										<div class="bar-row">
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
										</div>
										<div class="bar-row">
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
											<div class="bar-item empty w-[16px] h-[16px]"></div>
										</div>
										<div class="bar-row">
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
											<div class="bar-item filled w-[16px] h-[16px]"></div>
										</div>
									</div>

									<!-- 详细数据列表 -->
									<div class="data-list">
										<div class="data-item mb-[6px]">
											<span
												class="data-label text-[18px] whitespace-nowrap">Proportion
												of boat tourists during the off-season (7.5%)</span>
											<span
												class="data-value text-[18px] whitespace-nowrap">750
												people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span
												class="data-label text-[18px] whitespace-nowrap">During
												the off-season, tourists staying overnight use boats (75%)</span>
											<span
												class="data-value text-[18px] whitespace-nowrap">450
												people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span
												class="data-label text-[18px] whitespace-nowrap">Proportion
												of boat tourists during peak season (7.5%)</span>
											<span
												class="data-value text-[18px] whitespace-nowrap">1312
												people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span
												class="data-label text-[18px] whitespace-nowrap">Tourists
												staying overnight during peak season use boats (75%)</span>
											<span
												class="data-value text-[18px] whitespace-nowrap">900
												people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span
												class="data-label text-[18px] whitespace-nowrap">Average
												daily number of boat tourists during the off-season</span>
											<span
												class="data-value text-[18px] whitespace-nowrap">1200
												people</span>
										</div>
										<div class="data-item">
											<span
												class="data-label text-[18px] whitespace-nowrap">Average
												daily number of boat tourists during peak season</span>
											<span
												class="data-value text-[18px] whitespace-nowrap">2212
												people</span>
										</div>
									</div>
								</div>
							</div>

							<!-- 其他内容面板可以在这里添加 -->
							<div v-if="activeContent === 'tourists'" class="tourists-content">
								<div class="content-title text-base sm:text-lg md:text-xl lg:text-2xl">Daily average
									number of boat tourists</div>
								<p class="text-xs sm:text-sm md:text-base">Tourist data content will be displayed here.
								</p>
							</div>

							<div v-if="activeContent === 'profit'" class="profit-content">
								<div class="content-title text-base sm:text-lg md:text-xl lg:text-2xl">Operating profit
									and loss statement</div>
								<p class="text-xs sm:text-sm md:text-base">Profit and loss data will be displayed here.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Revenue Model 弹窗组件 -->
		<RevenueModal :visible="activeContent === 'revenue'" @close="hideContent" />


		<!-- 顶部导航栏 -->
		<TopNavigation />

		<!-- 主要内容区域 - 只在覆盖层完全关闭时显示 -->
		<div class="main-content" v-if="!showOverlay">
			<!-- 左侧面板：Revenue Model + Channel Strategy -->
			<div class="left-panel">
				<!-- 收入模型图表 -->
				<div class="chart-card revenue-hover-card w-[514px] h-[304px]"
					:class="{ 'revenue-selected': isRevenueSelected }" @click="showContent('revenue')">
					<h3 class="chart-title text-[20px]">Revenue Model</h3>
					<div class="chart-container">
						<div ref="revenueChartRef" class="revenue-echart"></div>
					</div>
				</div>


				<!-- 渠道策略 -->
				<div class="strategy-card">
					<h3 class="strategy-title text-[26px]">Channel Strategy</h3>

					<div class="strategy-section">
						<div class="strategy-subtitle text-[22px] whitespace-nowrap">Domestic (B-end water area
							operator)</div>
						<div class="strategy-content">
							<p class="strategy-label text-[21px]">Positioning:</p>
							<p class="strategy-text text-[18px]">To provide a full cycle hydrofoil operation solution
								for scenic
								spots, passenger transport companies, and hotels.</p>

							<p class="strategy-label text-[21px]">Core module:</p>
							<p class="strategy-text text-[18px]">Fleet operation and maintenance (equipment
								support)+safety
								management (real-time monitoring)</p>
							<p class="strategy-text text-[18px]">Product operation (leasing system)+dock support
								(infrastructure
								support)</p>
						</div>
					</div>

					<div class="strategy-section">
						<h4 class="strategy-subtitle text-[22px]">Overseas business (C-end private enterprises/private
							berth users)
						</h4>
						<div class="strategy-content">
							<p class="strategy-label text-[21px]">Positioning:</p>
							<p class="strategy-text text-[18px]">To build an intelligent hydrofoil boat lifestyle
								ecosystem for
								middle-class private berth users.</p>

							<p class="strategy-label text-[21px]">Core module:</p>
							<p class="strategy-text text-[18px]">Map service (navigation planning)+APP service (remote
								control)</p>
							<p class="strategy-text text-[18px]">Additional services (customized maintenance/social
								functions)</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 中间面板：Lake Como 地图 -->
			<div class="middle-panel">
				<div class="map-container" @click="showContent('lake')">
				</div>
			</div>
			<!-- 右侧面板：详细内容 -->
			<div class="right-panel">
				<!-- 默认显示内容 -->
				<!-- <div v-if="!activeContent" class="default-content">
					<h2 class="panel-title">Business Model Details</h2>
					<p class="panel-subtitle">Click on the map markers to view detailed information</p>
				</div> -->

				<!-- 内容面板 -->
				<div class="content-panel" v-if="activeContent && activeContent !== 'revenue'">

					<!-- Lake Como 案例内容 -->
					<div v-if="activeContent === 'lake' && !showLakeDetail" class="lake-content"
						@click="showLakeDetailPanel">
						<div class="content-title text-[36px] mb-[10.67px]">The case of Lake Como</div>
						<div class="content-subtitle text-[24px] mb-[26.67px]">Daily average number of tourists</div>

						<!-- ECharts 圆环图 -->
						<div class="pie-chart-container">
							<div ref="pieChartRef" class="pie-chart-echarts"></div>
						</div>

						<!-- 描述文字 -->
						<p class="description-text text-[18px] my-[26.67px]">
							Each hotel has an average of 100 rooms, totaling 400 rooms, calculated based on the number
							of tourists during the off-season.
						</p>

						<!-- 柱状图 -->
						<div class="bar-charts my-[26.67px]">
							<div class="bar-row">
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
							</div>
							<div class="bar-row">
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
							</div>
							<div class="bar-row">
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item filled w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
								<div class="bar-item empty w-[16px] h-[16px]"></div>
							</div>
						</div>

						<!-- 图例 -->
						<div class="legend">
							<div class="legend-item">
								<span class="legend-label text-[18px]">Daily average number of tourists</span>
								<span class="legend-value text-[18px]">10000 people</span>
							</div>
							<div class="legend-item">
								<span class="legend-label text-[18px]">Hotel load capacity</span>
								<span class="legend-value text-[18px]">1200 people</span>
							</div>
							<div class="legend-item">
								<span class="legend-label text-[18px]">Overnight tourists (50% occupancy rate)</span>
								<span class="legend-value text-[18px]">400-600 people</span>
							</div>
						</div>
					</div>

					<!-- Lake详情面板 -->
					<div v-if="activeContent === 'lake' && showLakeDetail" class="lake-content" @click="hideContent">
						<!-- Transportation Demand 部分 -->
						<div class="transportation-demand-section">
							<div class="main-title text-[20px] mb-[13px]">Daily average number of
								boat tourists</div>
							<div class="section-title text-[18px] mb-[13px]">Transportation Demand</div>

							<!-- ECharts 半环形图 -->
							<div class="demand-chart-container">
								<div ref="demandChartRef" class="demand-chart-echarts"></div>
								<!-- 引导线连接的文字 -->
								<div class="chart-labels">
									<div class="chart-label-left">
										<div class="label-text text-[18px]">Daily transportation
											demand</div>
										<div class="label-text text-[18px]">in the lake area</div>
									</div>
									<div class="chart-label-right">
										<div class="label-text text-[18px]">Connection Requirements
										</div>
									</div>
									<div class="chart-label-bottom">
										<div class="label-text text-[18px]">Other Requirements</div>
									</div>
								</div>
							</div>
							<!-- 描述文字 -->
							<div class="demand-description">
								<p class="text-[18px]">Each ship has a passenger capacity of 4 people</p>
								<p class="text-[18px]">The total demand for hydrofoil boats is 25-38</p>
							</div>
						</div>

						<!-- 游客数据部分 -->
						<div class="tourist-data-section mt-[12px]">
							<div class="section-title text-[18px] mb-[13px]">The daily average
								number of tourists taking boats on Lake Como,
								calculated based on the peak and off peak seasons</div>

							<!-- 柱状图 -->
							<div class="bar-charts my-[26.67px]">
								<!-- 第一行：11个filled + 4个empty = 15个方块 -->
								<div class="bar-row">
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
								</div>
								<div class="bar-row">
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
								</div>
								<div class="bar-row">
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
								</div>
								<div class="bar-row">
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
								</div>
								<div class="bar-row">
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
									<div class="bar-item empty w-[16px] h-[16px]"></div>
								</div>
								<div class="bar-row">
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
									<div class="bar-item filled w-[16px] h-[16px]"></div>
								</div>
							</div>

							<!-- 详细数据列表 -->
							<div class="data-list">
								<div class="data-item mb-[6px]">
									<span class="data-label text-[18px] whitespace-nowrap">Proportion of boat tourists during the
										off-season (7.5%)</span>
									<span class="data-value text-[18px] whitespace-nowrap">750 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label text-[18px] whitespace-nowrap">During the off-season, tourists staying
										overnight use boats (75%)</span>
									<span class="data-value text-[18px] whitespace-nowrap">450 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label text-[18px] whitespace-nowrap">Proportion of boat tourists during peak
										season (7.5%)</span>
									<span class="data-value text-[18px] whitespace-nowrap">1312 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label text-[18px] whitespace-nowrap">Tourists staying overnight during peak
										season use boats (75%)</span>
									<span class="data-value text-[18px] whitespace-nowrap">900 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label text-[18px] whitespace-nowrap">Average daily number of boat tourists
										during the off-season</span>
									<span class="data-value text-[18px] whitespace-nowrap">1200 people</span>
								</div>
								<div class="data-item">
									<span class="data-label text-[18px] whitespace-nowrap">Average daily number of boat tourists
										during peak season</span>
									<span class="data-value text-[18px] whitespace-nowrap">2212 people</span>
								</div>
							</div>
						</div>
					</div>

					<!-- 其他内容面板可以在这里添加 -->
					<div v-if="activeContent === 'tourists'" class="tourists-content">
						<div class="content-title">Daily average number of boat tourists</div>
						<p>Tourist data content will be displayed here.</p>
					</div>

					<div v-if="activeContent === 'profit'" class="profit-content">
						<div class="content-title">Operating profit and loss statement</div>
						<p>Profit and loss data will be displayed here.</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Financial Model 弹窗 - 使用 RevenueModal 组件 -->
	<div v-if="showFinancialModal"
		class="fixed inset-0 z-[10000] mt-[71px] sm:mt-[60px] w-full h-[calc(100%-71px)] sm:h-[calc(100%-60px)] bg-[#121727] overflow-hidden">
		<div class="relative w-full h-full financial-modal-wrapper">
			<!-- RevenueModal 内容 -->
			<RevenueModal :visible="showFinancialModal" @close="showFinancialModal = false" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import TopNavigation from '../components/TopNavigation.vue';
import RevenueModal from '../components/businessChart/RevenueModal.vue';
import { stack } from 'three/tsl';

const router = useRouter()

// 内容面板状态
const activeContent = ref('lake')
const showLakeDetail = ref(false)
const isRevenueSelected = ref(false)
const showDemandChart = ref(false) // 控制显示哪个echart

// Page navigation functions
// Revenue page navigation methods removed - now handled in RevenueModal component

// 覆盖层状态
const showOverlay = ref(true)
const showCContent = ref(false)
const showBContent = ref(false)

// Financial Model 弹窗状态
const showFinancialModal = ref(false)

// 隐藏覆盖层（完全关闭）
function hideOverlay() {
	showOverlay.value = false
	showCContent.value = false
	showBContent.value = false
}

// 显示C方块内容
function showCContentPanel() {
	showCContent.value = true
	showBContent.value = false
}

// 显示B方块内容
function showBContentPanel() {
	showBContent.value = true
	showCContent.value = false
}

// 返回方块选择
function backToBlocks() {
	showCContent.value = false
	showBContent.value = false
}

// lib-flexible 适配相关
let cleanupFlexible = null

// 图表数据
const chartData = ref([
	// { orange: 70, teal: 65 },
	// { orange: 75, teal: 70 },
	// { orange: 80, teal: 75 },
	// { orange: 85, teal: 85 },
	// { orange: 90, teal: 90 },
	// { orange: 95, teal: 95 },
	{ orange: 65, teal: 70 },
	{ orange: 70, teal: 80 },
	{ orange: 70, teal: 90 },
	{ orange: 75, teal: 105 },
	{ orange: 80, teal: 110 },
	{ orange: 90, teal: 120 },
	{ orange: 110, teal: 220 }
])

// 显示内容面板
async function showContent(contentType) {
	console.log('点击了内容类型:', contentType)
	activeContent.value = contentType
	console.log('activeContent 现在是:', activeContent.value)

	// 设置选中状态
	if (contentType === 'revenue') {
		isRevenueSelected.value = true
	} else {
		isRevenueSelected.value = false
	}

	// 等待DOM更新
	await nextTick()

	// 如果是lake类型，渲染饼图
	if (contentType === 'lake') {
		// 重置echart显示状态
		showDemandChart.value = false
		renderPieChart()
		// 如果显示详情面板，也渲染需求图表
		if (showLakeDetail.value) {
			renderDemandChart()
		}
		// 渲染完成后同步面板高度
		setTimeout(() => {
			syncPanelHeight()
		}, 200)
	} else {
		// 其他内容类型也同步高度
		setTimeout(() => {
			syncPanelHeight()
		}, 100)
	}
}

// 隐藏内容面板
function hideContent() {
	activeContent.value = null
	showLakeDetail.value = false
	isRevenueSelected.value = false
}

// 显示Lake详情面板
function showLakeDetailPanel() {
	showLakeDetail.value = true
	// 等待DOM更新后渲染需求图表
	nextTick(() => {
		renderDemandChart()
	})
}

// 切换echart显示
function toggleEchart() {
	showDemandChart.value = !showDemandChart.value
	// 等待DOM更新后渲染对应的图表
	nextTick(() => {
		if (showDemandChart.value) {
			renderDemandChart()
		} else {
			renderPieChart()
		}
		// 渲染完成后同步面板高度
		setTimeout(() => {
			syncPanelHeight()
		}, 200)
	})
}

// 隐藏Lake详情面板
function hideLakeDetailPanel() {
	showLakeDetail.value = false
}

// ECharts: Revenue Model
const revenueChartRef = ref(null)
let revenueChartInstance = null

// Lake Como Pie Chart
const pieChartRef = ref(null)
let pieChartInstance = null

// Transportation Demand Chart
const demandChartRef = ref(null)
let demandChartInstance = null

// 面板高度同步
const leftPanelRef = ref(null)
const rightPanelRef = ref(null)

// Page navigation (removed, now handled in RevenueModal component)

function renderRevenueChart() {
	if (!revenueChartRef.value) return

	// 如果实例已存在，先销毁它（因为DOM元素可能已经改变）
	if (revenueChartInstance) {
		revenueChartInstance.dispose()
		revenueChartInstance = null
	}

	// 重新创建实例
	revenueChartInstance = echarts.init(revenueChartRef.value)

	const oranges = chartData.value.map(d => d.orange)
	const teals = chartData.value.map(d => d.teal)

	const option = {
		animation: true,
		grid: { top: 5, bottom: 5, left: 5, right: 5, containLabel: false },
		xAxis: {
			type: 'category',
			data: new Array(chartData.value.length).fill(''),
			axisLine: { show: false },
			axisTick: { show: false },
			axisLabel: { show: false },
			splitLine: { show: false }
		},
		yAxis: { type: 'value', show: false },
		tooltip: { show: false },
		series: [
			{
				name: 'Teal',
				type: 'bar',
				data: teals,
				// barWidth: 15,
				// barGap: '5%',
				itemStyle: {
					// borderRadius: [6, 6, 0, 0],
					shadowColor: 'rgba(0,0,0,0.35)',
					shadowBlur: 10,
					shadowOffsetY: 4,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#3FF4FF' },
						{ offset: 0.35, color: '#19D8F3' },
						{ offset: 1, color: 'rgba(22, 79, 96, 0.65)' }
					])
				}
			},
			{
				name: 'Orange',
				type: 'bar',
				data: oranges,
				// barWidth: 15,
				// barGap: '5%',
				itemStyle: {
					// borderRadius: [6, 6, 0, 0],
					shadowColor: 'rgba(0,0,0,0.35)',
					shadowBlur: 10,
					shadowOffsetY: 4,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#FFC27A' },
						{ offset: 0.35, color: '#FF9A4E' },
						{ offset: 1, color: 'rgba(140, 98, 64, 0.65)' }
					])
				}
			},
		]
	}

	revenueChartInstance.setOption(option)
	// 自适应
	setTimeout(() => { revenueChartInstance?.resize() }, 0)
}

// renderModalCharts function removed - now handled by RevenueModal component

// renderChart*New functions removed - now handled by RevenueModal component

// createDiagonalPattern function removed - now handled by RevenueModal component

// Corrupted renderPieChart and renderChart*New functions removed - using correct function below

// All corrupted code removed - correct functions follow below





// Lake Como Pie Chart
function renderPieChart() {
	if (!pieChartRef.value) return

	// 如果实例已存在，先销毁（因为DOM可能已经被v-if销毁了）
	if (pieChartInstance) {
		pieChartInstance.dispose()
		pieChartInstance = null
	}

	// 重新创建实例
	pieChartInstance = echarts.init(pieChartRef.value)

	// 根据屏幕宽度计算响应式字体大小和labelLine长度
	const viewportWidth = window.innerWidth
	let labelFontSize = 15
	let labelLineHeight = 19
	let labelLineLength = 10
	let labelLineLength2 = 5
	
	if (viewportWidth <= 1366) {
		labelFontSize = 12
		labelLineHeight = 15
		labelLineLength = 5
		labelLineLength2 = 3
	} else if (viewportWidth <= 1600) {
		labelFontSize = 12
		labelLineHeight = 15
		labelLineLength = 5
		labelLineLength2 = 3
	} else if (viewportWidth <= 1920) {
		labelFontSize = 14
		labelLineHeight = 18
		labelLineLength = 10
		labelLineLength2 = 5
	} else {
		labelFontSize = 15
		labelLineHeight = 19
		labelLineLength = 10
		labelLineLength2 = 5
	}

	const option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {d}%'
		},
		series: [
			{
				name: 'Tourist Distribution',
				type: 'pie',
				radius: '50%', // 圆环图，调整内外半径
				center: ['50%', '50%'],
				startAngle: 90, // 从12点钟位置开始
				avoidLabelOverlap: false,
				itemGap: 10, // 扇形之间的间隔
				data: [
					{
						value: 35,
						name: 'Peak Season',
						itemStyle: {
							color: '#FF9A4E' // 橙色
						},
						label: {
							show: true,
							position: 'outside',
							formatter: 'Peak Season\nJune-September\nDaily average number of tourists\n15000-20000 people/time',
							fontSize: labelFontSize,
							// fontWeight: 'bold',
							color: '#ffffff',
							lineHeight: labelLineHeight
						},
						labelLine: {
							show: true,
							length: labelLineLength,
							length2: labelLineLength2,
							lineStyle: {
								color: '#FF9A4E',
								width: 1
							}
						}
					},
					{
						value: 65,
						name: 'Off-Season',
						itemStyle: {
							color: '#00d4ff' // 青色
						},
						label: {
							show: true,
							position: 'outside',
							formatter: 'Off-Season\nOctober-May\nDaily average number of tourists\n5000-10000 people/time',
							fontSize: labelFontSize,
							// fontWeight: 'bold',
							color: '#ffffff',
							lineHeight: labelLineHeight
						},
						labelLine: {
							show: true,
							length: labelLineLength,
							length2: labelLineLength2,
							lineStyle: {
								color: '#00d4ff',
								width: 1
							}
						}
					}
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 15,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(0, 0, 0, 0.8)',
						borderWidth: 3,
						borderColor: '#ffffff'
					},
					label: {
						show: true,
						fontSize: 12,
						fontWeight: 'bold',
						color: '#ffffff'
					}
				}
			}
		]
	}

	pieChartInstance.setOption(option)

	// 确保图表正确显示
	setTimeout(() => {
		if (pieChartInstance) {
			pieChartInstance.resize()
		}
	}, 100)
}

// Transportation Demand Chart
function renderDemandChart() {
	if (!demandChartRef.value) return

	// 如果实例已存在，先销毁（因为DOM可能已经被v-if销毁了）
	if (demandChartInstance) {
		demandChartInstance.dispose()
		demandChartInstance = null
	}

	// 重新创建实例
	demandChartInstance = echarts.init(demandChartRef.value)

	const option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {d}%'
		},
		series: [
			{
				name: 'Transportation Demand',
				type: 'pie',
				radius: ['30%', '60%'], // 环形图
				center: ['50%', '80%'], // 调整中心点位置，让图表显示在下半部分
				startAngle: 180, // 从180度开始，实现半圆
				endAngle: 360, // 到360度结束，实现半圆
				avoidLabelOverlap: false,
				itemGap: 8,
				data: [
					{
						value: 35,
						name: '15-20',
						itemStyle: {
							color: '#00d4ff' // 青色
						},
						label: {
							show: true,
							position: 'inside',
							formatter: '15-20',
							fontSize: 10,
							color: '#ffffff',
							fontWeight: 'bold'
						},
						labelLine: {
							show: true,
							length: 15,
							length2: 8,
							lineStyle: {
								color: '#00d4ff',
								width: 1
							}
						}
					},
					{
						value: 25,
						name: '10-25',
						itemStyle: {
							color: '#FF9A4E' // 橙色
						},
						label: {
							show: true,
							position: 'inside',
							formatter: '10-25',
							fontSize: 10,
							color: '#ffffff',
							fontWeight: 'bold'
						},
						labelLine: {
							show: true,
							length: 15,
							length2: 8,
							lineStyle: {
								color: '#FF9A4E',
								width: 1
							}
						}
					},
					{
						value: 40,
						name: 'Other Requirements',
						itemStyle: {
							color: '#ffffff' // 白色
						},
						label: {
							show: true,
							position: 'inside',
							formatter: '',
							fontSize: 10,
							color: '#ffffff',
							fontWeight: 'bold'
						},
						labelLine: {
							show: true,
							length: 15,
							length2: 8,
							lineStyle: {
								color: '#ffffff',
								width: 1
							}
						}
					}
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 15,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(0, 0, 0, 0.8)',
						borderWidth: 3,
						borderColor: '#ffffff'
					},
					label: {
						show: true,
						fontSize: 12,
						fontWeight: 'bold',
						color: '#ffffff'
					}
				}
			}
		]
	}

	demandChartInstance.setOption(option)

	// 确保图表正确显示
	setTimeout(() => {
		if (demandChartInstance) {
			demandChartInstance.resize()
		}
	}, 100)
}

onMounted(() => {
	window.addEventListener('resize', onWindowResize)
	// 初始同步面板高度，等待内容渲染完成
	setTimeout(() => {
		// 如果默认显示lake内容，等待echart渲染完成
		if (activeContent.value === 'lake') {
			renderPieChart()
			setTimeout(() => {
				syncPanelHeight()
			}, 300)
		} else {
			syncPanelHeight()
		}
	}, 200)
})

// 监听B内容面板显示或覆盖层关闭，渲染图表
watchEffect(() => {
	if (showBContent.value || !showOverlay.value) {
		nextTick(() => {
			// 确保DOM已更新，延迟一下再渲染图表
			setTimeout(() => {
				if (showBContent.value || !showOverlay.value) {
					renderRevenueChart()
					renderPieChart()
					// 图表渲染完成后同步面板高度
					setTimeout(() => {
						syncPanelHeight()
					}, 300)
				}
			}, 100)
		})
	}
})

// 同步左右面板高度，响应屏幕大小变化
function syncPanelHeight() {
	if (leftPanelRef.value && rightPanelRef.value) {
		nextTick(() => {
			const viewportHeight = window.innerHeight
			
			// 获取左侧面板的顶部位置
			const leftRect = leftPanelRef.value.getBoundingClientRect()
			const leftTopOffset = leftRect.top
			
			// 获取右侧面板的顶部位置
			const rightRect = rightPanelRef.value.getBoundingClientRect()
			const rightTopOffset = rightRect.top
			
			// 当浏览器高度小于1080px时，面板底部距离视口底部120px
			if (viewportHeight < 1080) {
				// 计算左侧面板的最大高度：视口高度 - 顶部距离 - 底部距离(120px)
				const leftMaxHeight = viewportHeight - leftTopOffset - 120
				
				// 设置左侧面板的最大高度，但不设置滚动（滚动条在 strategy-card 内显示）
				leftPanelRef.value.style.maxHeight = `${leftMaxHeight}px`
				leftPanelRef.value.style.height = 'auto'
				leftPanelRef.value.style.overflowY = 'visible'
				leftPanelRef.value.style.overflowX = 'visible'
				
				// 等待左侧面板高度更新后，获取实际高度
				requestAnimationFrame(() => {
					// 获取左侧面板的实际高度（包括内容）
					const leftActualHeight = leftPanelRef.value.offsetHeight
					
					// 设置右侧面板的高度与左侧面板一致
					rightPanelRef.value.style.maxHeight = `${leftActualHeight}px`
					rightPanelRef.value.style.height = `${leftActualHeight}px`
					rightPanelRef.value.style.overflowY = 'visible'
					rightPanelRef.value.style.overflowX = 'visible'
					
					// 设置 strategy-card 的最大高度和滚动，让滚动条在这里显示
					const strategyCard = leftPanelRef.value.querySelector('.strategy-card')
					if (strategyCard) {
						// 计算 strategy-card 的最大高度：左侧面板高度 - Revenue Model 卡片高度 - padding - gap
						const revenueCard = leftPanelRef.value.querySelector('.revenue-hover-card')
						const revenueCardHeight = revenueCard ? revenueCard.offsetHeight : 0
						const leftPanelPadding = parseFloat(window.getComputedStyle(leftPanelRef.value).paddingTop) + parseFloat(window.getComputedStyle(leftPanelRef.value).paddingBottom)
						const leftPanelGap = parseFloat(window.getComputedStyle(leftPanelRef.value).gap) || 12
						const strategyCardMaxHeight = leftActualHeight - revenueCardHeight - leftPanelPadding - leftPanelGap
						
						strategyCard.style.maxHeight = `${strategyCardMaxHeight}px`
						strategyCard.style.height = 'auto'
						strategyCard.style.overflowY = 'auto'
						strategyCard.style.overflowX = 'visible'
					}
					
					// 设置右侧面板的 content-panel，让滚动条在这里显示
					const contentPanel = rightPanelRef.value.querySelector('.content-panel')
					if (contentPanel) {
						// 计算 content-panel 的最大高度：右侧面板高度 - padding
						const rightPanelPadding = parseFloat(window.getComputedStyle(rightPanelRef.value).paddingTop) + parseFloat(window.getComputedStyle(rightPanelRef.value).paddingBottom)
						const contentPanelMaxHeight = leftActualHeight - rightPanelPadding
						contentPanel.style.maxHeight = `${contentPanelMaxHeight}px`
						contentPanel.style.height = 'auto'
						contentPanel.style.overflowY = 'auto'
						contentPanel.style.overflowX = 'visible'
					}
				})
			} else {
				// 当浏览器高度 >= 1080px 时，使用自适应高度，但保持左右面板高度一致
				// 先让左侧面板自适应内容
				leftPanelRef.value.style.maxHeight = 'none'
				leftPanelRef.value.style.height = 'auto'
				leftPanelRef.value.style.overflow = 'visible'
				
				// 等待左侧面板高度更新后，获取实际高度
				requestAnimationFrame(() => {
					// 获取左侧面板的实际高度（包括内容）
					const leftActualHeight = leftPanelRef.value.offsetHeight
					
					// 设置右侧面板的高度与左侧面板一致
					rightPanelRef.value.style.maxHeight = 'none'
					rightPanelRef.value.style.height = `${leftActualHeight}px`
					rightPanelRef.value.style.overflow = 'visible'
					
					const strategyCard = leftPanelRef.value.querySelector('.strategy-card')
					if (strategyCard) {
						// 计算 strategy-card 的最大高度：左侧面板高度 - Revenue Model 卡片高度 - padding - gap
						const revenueCard = leftPanelRef.value.querySelector('.revenue-hover-card')
						const revenueCardHeight = revenueCard ? revenueCard.offsetHeight : 0
						const leftPanelPadding = parseFloat(window.getComputedStyle(leftPanelRef.value).paddingTop) + parseFloat(window.getComputedStyle(leftPanelRef.value).paddingBottom)
						const leftPanelGap = parseFloat(window.getComputedStyle(leftPanelRef.value).gap) || 12
						const strategyCardMaxHeight = leftActualHeight - revenueCardHeight - leftPanelPadding - leftPanelGap
						
						strategyCard.style.maxHeight = `${strategyCardMaxHeight}px`
						strategyCard.style.height = 'auto'
						
						// 如果内容超出，在 strategy-card 上显示滚动条
						const strategyCardContentHeight = strategyCard.scrollHeight
						if (strategyCardContentHeight > strategyCardMaxHeight) {
							strategyCard.style.overflowY = 'auto'
						} else {
							strategyCard.style.overflowY = 'visible'
						}
						strategyCard.style.overflowX = 'visible'
					}
					
					// content-panel 在内容超出时显示滚动条
					const contentPanel = rightPanelRef.value.querySelector('.content-panel')
					if (contentPanel) {
						// 计算 content-panel 的最大高度：右侧面板高度 - padding
						const rightPanelPadding = parseFloat(window.getComputedStyle(rightPanelRef.value).paddingTop) + parseFloat(window.getComputedStyle(rightPanelRef.value).paddingBottom)
						const contentPanelMaxHeight = leftActualHeight - rightPanelPadding
						
						contentPanel.style.maxHeight = `${contentPanelMaxHeight}px`
						contentPanel.style.height = 'auto'
						
						// 如果内容超出，在 content-panel 上显示滚动条
						const contentHeight = contentPanel.scrollHeight
						if (contentHeight > contentPanelMaxHeight) {
							contentPanel.style.overflowY = 'auto'
						} else {
							contentPanel.style.overflowY = 'visible'
						}
						contentPanel.style.overflowX = 'visible'
					}
				})
			}
		})
	}
}

// 监听内容变化，同步面板高度（固定高度不需要频繁更新，但窗口大小变化时需要）
watch([activeContent, showLakeDetail, showBContent], () => {
	// 内容变化时确保高度已设置
	nextTick(() => {
		syncPanelHeight()
	})
})

function onWindowResize() {
	// 使用防抖来优化性能，避免频繁重绘
	clearTimeout(window.resizeTimer)
	window.resizeTimer = setTimeout(() => {
		// 同步面板高度（窗口大小变化时重新计算固定高度）
		syncPanelHeight()
		// 重新渲染所有图表以确保正确缩放
		if (revenueChartInstance) {
			revenueChartInstance.resize()
			renderRevenueChart()
		}
		if (pieChartInstance) {
			pieChartInstance.resize()
			renderPieChart()
		}
		if (demandChartInstance) {
			demandChartInstance.resize()
			renderDemandChart()
		}
		// Revenue modal charts are now handled by RevenueModal component
	}, 150)
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', onWindowResize)
	// 清理定时器
	clearTimeout(window.resizeTimer)

	if (revenueChartInstance) {
		revenueChartInstance.dispose()
		revenueChartInstance = null
	}
	if (pieChartInstance) {
		pieChartInstance.dispose()
		pieChartInstance = null
	}
	// Revenue modal chart instances cleanup removed - now handled by RevenueModal component
	if (demandChartInstance) {
		demandChartInstance.dispose()
		demandChartInstance = null
	}
})

// 若数据变化，重绘
watchEffect(() => {
	if (revenueChartInstance) renderRevenueChart()
})

function goHome() {
	router.push('/')
}

</script>

<style scoped>
.business-model {
	min-height: 100vh;
	/* 背景色为#000000 */
	color: #ffffff;
	font-family: 'Arial', sans-serif;
}

/* 前置覆盖层 - 白色背景 */
.overlay-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
	z-index: 9999;
	pointer-events: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 方块容器 */
.overlay-blocks {
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	position: relative;
}

/* 内层矩形容器 - 带圆角和边框 */
.overlay-inner-container {
	position: absolute;
	top: 130px;
	left: 50px;
	right: 50px;
	bottom: 50px;
	/* background-color: #ffffff; */
	/* border: 3px solid #000000; */
	border-radius: 20px;
	/* box-shadow: 0 0 0 8px #ffffff; */
	overflow: hidden;
	z-index: 1;
}

/* B区域 - 左侧，现代玻璃拟态效果 */
.region-b-left {
	position: absolute;
	top: 0;
	left: 0;
	width: 50%;
	height: 100%;
	background: url('../assets/bs_bg.png') center/cover no-repeat;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	overflow: hidden;
	position: relative;
	z-index: 1;
}

.region-b-left::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(135deg,
			rgba(20, 30, 48, 0.32) 0%,
			rgba(36, 59, 85, 0.2) 100%);
	backdrop-filter: blur(15px) saturate(120%);
	-webkit-backdrop-filter: blur(15px) saturate(120%);
	z-index: 1;
}

.region-b-left::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(135deg,
			rgba(0, 212, 255, 0.08) 0%,
			transparent 50%,
			rgba(0, 150, 255, 0.05) 100%);
	z-index: 2;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.region-b-left:hover::after {
	opacity: 1;
}

.region-b-left:hover {
	transform: scale(1.01);
}

/* C区域 - 右侨，现代玻璃拟态效果 */
.region-c-right {
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;
	background: url('../assets/c_clinet_bg.png') center/cover no-repeat;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	overflow: hidden;
	z-index: 1;
}

.region-c-right::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(135deg,
			rgba(36, 59, 85, 0.2) 0%,
			rgba(20, 30, 48, 0.32) 100%);
	backdrop-filter: blur(15px) saturate(120%);
	-webkit-backdrop-filter: blur(15px) saturate(120%);
	z-index: 1;
}

.region-c-right::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(135deg,
			rgba(94, 165, 170, 0.05) 0%,
			transparent 50%,
			rgba(0, 212, 255, 0.08) 100%);
	z-index: 2;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.region-c-right:hover::after {
	opacity: 1;
}

.region-c-right:hover {
	transform: scale(1.01);
}

/* 区域内容 - B和C的文字容器 */
.region-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	pointer-events: none;
}

/* 区域标签 - 大字母 */
.region-label {
	font-weight: 800;
	color: rgba(255, 255, 255, 0.95);
	text-shadow:
		0 0 30px rgba(0, 212, 255, 0.4),
		0 0 60px rgba(0, 212, 255, 0.2),
		0 10px 40px rgba(0, 0, 0, 0.4);
	letter-spacing: -5px;
	line-height: 1;
	transition: all 0.3s ease;
	font-family: 'Helvetica Neue', sans-serif;
}

/* 区域文字 - 说明文字 */
.region-text {
	font-weight: 300;
	color: rgba(255, 255, 255, 0.7);
	letter-spacing: 6px;
	text-transform: uppercase;
	transition: all 0.3s ease;
	font-family: 'Helvetica Neue', sans-serif;
}

.region-b-left:hover .region-label,
.region-c-right:hover .region-label {
	transform: scale(1.08);
	text-shadow:
		0 0 50px rgba(0, 212, 255, 0.6),
		0 0 100px rgba(0, 212, 255, 0.3),
		0 15px 50px rgba(0, 0, 0, 0.5);
}

.region-b-left:hover .region-text,
.region-c-right:hover .region-text {
	letter-spacing: 10px;
	color: rgba(255, 255, 255, 0.9);
}

/* 中间分割线 */
.center-divider {
	position: absolute;
	top: 10%;
	left: 50%;
	transform: translateX(-50%);
	width: 1px;
	height: 80%;
	background: linear-gradient(180deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 10%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.1) 90%,
			transparent 100%);
	z-index: 10;
	box-shadow:
		0 0 10px rgba(0, 212, 255, 0.2),
		0 0 20px rgba(0, 212, 255, 0.1);
}


/* 响应式断点 - 内层容器 - 平板 */
@media (max-width: 1024px) {
	.overlay-inner-container {
		top: 110px;
		left: 30px;
		right: 30px;
		bottom: 30px;
		border-radius: 16px;
		box-shadow: 0 0 0 6px #ffffff;
	}
}

/* 响应式断点 - 内层容器 - 小屏幕 */
@media (max-width: 768px) {
	.overlay-inner-container {
		top: 100px;
		left: 20px;
		right: 20px;
		bottom: 20px;
		border: 2px solid #000000;
		border-radius: 12px;
		box-shadow: 0 0 0 4px #ffffff;
	}
}

/* 响应式断点 - 内层容器 - 手机 */
@media (max-width: 480px) {
	.overlay-inner-container {
		top: 90px;
		left: 10px;
		right: 10px;
		bottom: 10px;
		border: 2px solid #000000;
		border-radius: 8px;
		box-shadow: 0 0 0 3px #ffffff;
	}
}

/* 对角线分割线 */
/* .diagonal-line {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: visible;
	z-index: 10;
}

.diagonal-line::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 3px;
	height: 160%;
	background-color: #000000;
	transform: translate(-50%, -50%) rotate(-45deg);
	transform-origin: center center;
} */

/* 第二条对角线 - 也是从右上到左下，与第一条距离50px */
/* .diagonal-line-2::before {
	content: '';
	position: absolute;
	top: calc(50% + 35.35px);
	left: calc(50% - 35.35px);
	width: 3px;
	height: 160%;
	background-color: #000000;
	transform: translate(-50%, -50%) rotate(-45deg);
	transform-origin: center center;
} */

/* 响应式断点 - 对角线 - 小屏幕 */
@media (max-width: 768px) {

	.diagonal-line::before,
	.diagonal-line-2::before {
		width: 2px;
	}

	.diagonal-line-2::before {
		top: calc(50% + 28.28px);
		left: calc(50% - 28.28px);
	}
}

/* 响应式断点 - 对角线 - 手机 */
@media (max-width: 480px) {

	.diagonal-line::before,
	.diagonal-line-2::before {
		width: 1.5px;
	}

	.diagonal-line-2::before {
		top: calc(50% + 21.21px);
		left: calc(50% - 21.21px);
	}
}

/* 隐藏原来的方块，因为B和C现在直接显示在区域中 */
.block {
	display: none;
}

.block_1 {
	content: '';
	position: absolute;
	top: 132px;
	left: 440px;
	width: 70px;
	height: 50px;
	/* border: 10px solid pink; */
	background-color: #ffffff;
	transform: rotate(180deg);
	transform-origin: top center;
	z-index: 10000;
}

/* 响应式断点 - block_1 - 平板 */
@media (max-width: 1024px) {
	.block_1 {
		top: 112px;
		left: 475px;
		height: 40px;
	}
}

/* 响应式断点 - block_1 - 小屏幕 */
@media (max-width: 768px) {
	.block_1 {
		top: 102px;
		left: 465px;
		height: 30px;
	}
}

/* 响应式断点 - block_1 - 手机 */
@media (max-width: 480px) {
	.block_1 {
		top: 92px;
		left: 455px;
		height: 30px;
	}
}

.block_2 {
	content: '';
	position: absolute;
	bottom: 53px;
	left: 1340px;
	width: 70px;
	height: 50px;
	background-color: #ffffff;
	/* border: 1px solid pink; */
	transform: rotate(180deg);
	transform-origin: bottom center;
	z-index: 10000;
}

/* 响应式断点 - block_2 - 平板 */
@media (max-width: 1024px) {
	.block_2 {
		bottom: 30px;
		left: 475px;
		height: 40px;
	}
}

/* 响应式断点 - block_2 - 小屏幕 */
@media (max-width: 768px) {
	.block_2 {
		bottom: 20px;
		left: 465px;
		height: 30px;
	}
}

/* 响应式断点 - block_2 - 手机 */
@media (max-width: 480px) {
	.block_2 {
		bottom: 10px;
		left: 455px;
		height: 30px;
	}
}

/* C方块内容面板 - 全屏 */
.c-content-panel {
	margin-top: 71px;
	width: 100%;
	height: calc(100% - 71px);
	position: absolute;
	top: 0;
	left: 0;
	background: #121727;
	animation: fadeInScale 0.5s ease-out;
	overflow-y: auto;
}

/* 小屏幕适配 */
@media (max-width: 640px) {
	.c-content-panel {
		margin-top: 60px;
		height: calc(100% - 60px);
	}
}

/* B方块内容面板 - 全屏 */
.b-content-panel {
	width: 100%;
	height: 100%;
	background: url('../assets/bs_bg.png') center/cover no-repeat;
	background-color: #000000;
	position: absolute;
	top: 0;
	left: 0;
	animation: fadeInScale 0.5s ease-out;
	overflow: hidden;
}

.b-content-panel .main-content {
	min-height: calc(100vh - 80px - 150px);
	height: auto;
	max-height: none;
	padding-top: 80px;
	padding-left: 80px;
	padding-right: 50px;
	padding-bottom: 20px;
	overflow: visible;
}

/* 响应式布局 - 修复比例问题 */
@media (max-width: 1920px) and (min-width: 1601px) {
	.b-content-panel .main-content {
		padding-left: 80px;
		padding-right: 60px;
		gap: 12px;
	}

	.b-content-panel .left-panel {
		flex: 0 0 520px !important;
		min-width: 520px !important;
		max-width: 520px !important;
	}

	.b-content-panel .right-panel {
		flex: 0 0 600px !important;
		min-width: 600px !important;
		max-width: 600px !important;
		margin-right: 40px !important;
	}

	.b-content-panel .content-panel {
		width: 100% !important;
	}
}

@media (max-width: 1600px) {
	.b-content-panel .main-content {
		padding-left: 60px;
		padding-right: 40px;
		gap: 12px;
	}

	.b-content-panel .left-panel {
		width: 520px !important;
		min-width: 520px !important;
		max-width: 520px !important;
	}
	
	.b-content-panel .right-panel {
		flex: 0 0 550px !important;
		min-width: 550px !important;
		max-width: 550px !important;
		margin-right: 30px !important;
	}

	.b-content-panel .content-panel {
		width: 480px !important;
	}

	.b-content-panel .chart-card.revenue-hover-card {
		width: 100% !important;
		max-width: 100% !important;
	}
}

@media (max-width: 1366px) {
	.b-content-panel .main-content {
		padding-left: 40px;
		padding-right: 30px;
		gap: 10px;
	}

	.b-content-panel .left-panel {
		width: 380px !important;
		min-width: 380px !important;
		max-width: 380px !important;
		padding: 12px;
	}
	
	.b-content-panel .right-panel {
		flex: 0 0 500px !important;
		min-width: 500px !important;
		max-width: 500px !important;
		margin-right: 20px !important;
	}

	.b-content-panel .content-panel {
		width: 420px !important;
	}

	.b-content-panel .chart-card.revenue-hover-card {
		width: 100% !important;
		height: auto !important;
		min-height: 260px;
	}

	.b-content-panel .chart-container {
		height: 200px !important;
	}
}

@media (max-width: 1024px) {
	.b-content-panel .main-content {
		padding-left: 20px;
		padding-right: 15px;
		flex-direction: column;
		overflow-y: auto;
	}

	.b-content-panel .left-panel {
		width: 100% !important;
		min-width: 100% !important;
		max-width: 100% !important;
		height: auto !important;
	}
	
	.b-content-panel .right-panel {
		flex: 1 1 100% !important;
		min-width: 100% !important;
		max-width: 100% !important;
		margin-right: 15px !important;
	}

	.b-content-panel .content-panel {
		width: 100% !important;
	}
}

/* 关闭按钮 - 统一样式 */
.close-content-btn {
	position: fixed;
	top: 80px;
	right: 30px;
	background: rgba(0, 0, 0, 0.1);
	color: #333333;
	border: none;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10001;
	line-height: 1;
	font-size: 20px;
}

.c-content-panel .close-content-btn {
	color: #333333;
	/* background: rgba(0, 0, 0, 0.1); */
	background: #ffffff;
}

.b-content-panel .close-content-btn {
	color: #ffffff;
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
}

.close-content-btn:hover {
	transform: rotate(90deg) scale(1.1);
}

.c-content-panel .close-content-btn:hover {
	/* background: rgba(0, 0, 0, 0.2); */
	background: #ffffff;
}

.b-content-panel .close-content-btn:hover {
	background: rgba(255, 255, 255, 0.3);
}

.close-content-btn:active {
	transform: rotate(90deg) scale(0.95);
}

.c-content-wrapper {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: 1fr auto 1fr;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	position: relative;
	padding: 20px 40px;
	margin: 0 auto;
}

/* 小屏幕适配 */
@media (max-width: 640px) {
	.c-content-wrapper {
		padding: 15px 20px;
	}
}

/* 内容区域样式 */
.c-content-wrapper .content-section {
	position: relative;
	padding: 20px;
	z-index: 2;
	min-width: 400px;
}

/* 小屏幕适配 */
@media (max-width: 1024px) {
	.c-content-wrapper .content-section {
		min-width: 280px;
		padding: 15px;
	}
}

@media (max-width: 640px) {
	.c-content-wrapper .content-section {
		min-width: unset;
		padding: 10px;
	}
}

.c-content-wrapper .content-section.top-left {
	grid-column: 1;
	grid-row: 1 / span 2;
	text-align: left;
	align-self: center;
	padding-bottom: 90%;
}

.c-content-wrapper .content-section.top-right {
	grid-column: 3;
	grid-row: 1 / span 2;
	text-align: left;
	align-self: center;
	justify-self: end;
	padding-bottom: 90%;
}

.c-content-wrapper .content-section.bottom-left {
	grid-column: 1;
	grid-row: 2 / span 2;
	text-align: left;
	align-self: center;
	padding-top: 90%;
}

.c-content-wrapper .content-section.bottom-right {
	grid-column: 3;
	grid-row: 2 / span 2;
	text-align: left;
	align-self: center;
	justify-self: end;
	padding-top: 90%;
}

/* 小屏幕适配 */
@media (max-width: 1024px) {

	.c-content-wrapper .content-section.top-left,
	.c-content-wrapper .content-section.top-right {
		padding-bottom: 50%;
	}

	.c-content-wrapper .content-section.bottom-left,
	.c-content-wrapper .content-section.bottom-right {
		padding-top: 50%;
	}
}

@media (max-width: 640px) {

	.c-content-wrapper .content-section.top-left,
	.c-content-wrapper .content-section.top-right {
		padding-bottom: 20px;
	}

	.c-content-wrapper .content-section.bottom-left,
	.c-content-wrapper .content-section.bottom-right {
		padding-top: 20px;
	}
}

/* 中间图片容器 */
.c-content-wrapper .center-image-container {
	grid-column: 2;
	grid-row: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.c-content-wrapper .center-image {
	max-width: 1400px;
	width: 100%;
	height: auto;
	object-fit: contain;
}

/* 小屏幕适配 */
@media (max-width: 1024px) {
	.c-content-wrapper .center-image {
		max-width: 800px;
	}
}

@media (max-width: 640px) {
	.c-content-wrapper .center-image {
		max-width: 300px;
	}
}

/* 标题样式 */
.c-content-wrapper .content-section-title {
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 10px;
	line-height: 1.3;
}

/* 文本样式 */
.c-content-wrapper .section-text {
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.6;
}

/* 响应式布局 */
@media (max-width: 1200px) {
	.c-content-wrapper {
		padding: 40px 30px;
	}

	.c-content-wrapper .center-image {
		max-width: 550px;
	}

	.c-content-wrapper .content-section {
		min-width: 300px;
	}
}

@media (max-width: 768px) {
	.c-content-wrapper {
		display: flex;
		flex-direction: column;
		padding: 30px 20px;
		gap: 30px;
	}

	.c-content-wrapper .content-section {
		text-align: left !important;
		align-self: center !important;
		min-width: auto;
		width: 100%;
		padding-top: 20px !important;
		padding-bottom: 20px !important;
	}

	.c-content-wrapper .center-image-container {
		order: -1;
	}

	.c-content-wrapper .center-image {
		max-width: 400px;
	}

	.c-content-wrapper .content-section::before {
		display: none;
	}
}

/* 超小屏幕适配 */
@media (max-width: 480px) {
	.c-content-wrapper {
		display: flex;
		flex-direction: column;
		padding: 15px 10px;
		gap: 20px;
	}

	.c-content-wrapper .center-image-container {
		margin-bottom: 15px;
	}

	.c-content-wrapper .center-image {
		max-width: 250px;
	}

	.c-content-wrapper .content-section {
		padding: 10px !important;
	}
}

.c-content-title {
	font-weight: 700;
	color: #333333;
	margin-bottom: 40px;
	text-align: center;
	background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.c-content-body {
	color: #666666;
	line-height: 1.8;
	text-align: center;
	max-width: 800px;
}

.c-content-body p {
	margin: 20px 0;
}

@keyframes fadeInScale {
	from {
		opacity: 0;
		transform: scale(0.9);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}

/* 主要内容区域 */
.main-content {
	display: flex;
	min-height: calc(100vh - 80px - 150px);
	height: auto;
	max-height: none;
	padding-top: 80px;
	gap: 15px;
	overflow: visible;
	padding-left: 80px;
	padding-right: 50px;
	padding-bottom: 20px;
}

/* 响应式布局 - 主内容区域 */
@media (max-width: 1920px) {
	.main-content {
		padding-left: 80px;
		padding-right: 60px;
		gap: 12px;
	}
}

@media (max-width: 1600px) {
	.main-content {
		padding-left: 60px;
		padding-right: 40px;
		gap: 12px;
	}
	
	.right-panel {
		margin-right: 30px;
	}
}

@media (max-width: 1366px) {
	.main-content {
		padding-left: 40px;
		padding-right: 30px;
		gap: 10px;
	}
	
	.right-panel {
		margin-right: 20px;
	}
}

@media (max-width: 1024px) {
	.main-content {
		padding-left: 20px;
		padding-right: 15px;
		flex-direction: column;
		overflow-y: auto;
	}
	
	.right-panel {
		margin-right: 15px;
	}
}

/* 左侧面板：Revenue Model + Channel Strategy */
.left-panel {
	flex: 0 0 520px;
	min-width: 520px;
	max-width: 520px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	overflow: visible;
	/* 高度由 JavaScript 动态设置为固定值，overflow: visible 确保内容全部显示 */
}

/* 响应式布局 - 左侧面板 */
@media (max-width: 1920px) {
	.left-panel {
		flex: 0 0 520px;
		min-width: 520px;
		max-width: 520px;
	}
}

@media (max-width: 1600px) {
	.left-panel {
		flex: 0 0 520px;
		min-width: 520px;
		max-width: 520px;
	}
}

@media (max-width: 1366px) {
	.left-panel {
		flex: 0 0 380px;
		min-width: 380px;
		max-width: 380px;
		padding: 12px;
	}
}

@media (max-width: 1024px) {
	.left-panel {
		flex: 1 1 100%;
		min-width: 100%;
		max-width: 100%;
		height: auto;
	}
}

/* 中间面板：Lake Como 地图 */
.middle-panel {
	flex: 1;
	min-width: 400px;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.map-container {
	position: fixed;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: min(100px, 8vw);
	height: min(100px, 8vw);
	max-width: 100px;
	max-height: 100px;
	min-width: 60px;
	min-height: 60px;

	overflow: hidden;
	cursor: pointer;
	z-index: 1000;
}



/* 右侧面板：详细内容 */
.right-panel {
	flex: 0 0 650px;
	min-width: 650px;
	max-width: 650px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	overflow: visible;
	align-items: flex-start;
	margin-left: auto;
	margin-right: 40px;
	margin-top: -100px; /* 往上移动100px */
	/* 高度由 JavaScript 动态设置为固定值，margin-left: auto 确保面板在最右侧 */
	/* 滚动条在 content-panel 内部显示，不在 right-panel 上 */
}

/* 响应式布局 - 右侧面板 */
@media (max-width: 1920px) {
	.right-panel {
		flex: 0 0 600px;
		min-width: 600px;
		max-width: 600px;
		margin-right: 40px;
	}
}

@media (max-width: 1600px) {
	.right-panel {
		flex: 0 0 550px;
		min-width: 550px;
		max-width: 550px;
		margin-right: 30px;
	}
}

@media (max-width: 1366px) {
	.right-panel {
		flex: 0 0 500px;
		min-width: 500px;
		max-width: 500px;
		margin-right: 20px;
	}
}

@media (max-width: 1024px) {
	.right-panel {
		flex: 1 1 100%;
		min-width: 100%;
		max-width: 100%;
		margin-right: 15px;
	}
}

.right-panel .content-panel {
	width: 100% !important;
	max-width: 100% !important;
	height: auto !important;
	max-height: none !important;
	overflow-y: auto;
	overflow-x: visible;
	box-sizing: border-box;
	position: relative !important;
	margin: 0 !important;
	background: rgba(255, 255, 255, 0.05) !important;
	backdrop-filter: blur(30px);
	border: 1px solid rgba(255, 255, 255, 0.15) !important;
	/* 滚动条在 content-panel 内部显示，不在 right-panel 上 */
}

/* 自定义滚动条样式 - 右侧面板 content-panel */
.right-panel .content-panel::-webkit-scrollbar {
	width: 6px;
}

.right-panel .content-panel::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 3px;
}

.right-panel .content-panel::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.3);
	border-radius: 3px;
}

.right-panel .content-panel::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.5);
}

.right-panel .content-panel::-webkit-scrollbar-corner {
	background: transparent;
}

/* 默认内容样式 */
.default-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-align: center;
}

.panel-title {
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 15px;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.panel-subtitle {
	color: #cccccc;
	line-height: 1.6;
}

/* 图表卡片 */
.chart-card {
	/* 宽度和高度由 Tailwind 类控制 */
	/* background: #FFFFFF; */
	background: rgba(255, 255, 255, 0.08);
	border-radius: 10px 10px 10px 10px;
	/* opacity: 0.1; */
	backdrop-filter: blur(15px);
	padding: 15px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	flex-shrink: 0;
	overflow: hidden;
	margin-bottom: 8px;
	transition: all 0.3s ease;
	cursor: pointer;
	position: relative;
}

/* Revenue Model 选中状态 */
.revenue-selected {
	border: 2px solid #00d4ff;
	background: rgba(0, 212, 255, 0.1);
	box-shadow:
		0 8px 32px rgba(0, 0, 0, 0.3),
		0 0 20px rgba(0, 212, 255, 0.4),
		0 0 40px rgba(0, 212, 255, 0.2),
		inset 0 0 20px rgba(0, 212, 255, 0.1);
	transform: scale(1.02);
}

/* Revenue Model 选中时的光晕效果 */
.revenue-selected::before {
	content: '';
	position: absolute;
	top: -2px;
	left: -2px;
	right: -2px;
	bottom: -2px;
	background: linear-gradient(45deg,
			rgba(0, 212, 255, 0.3) 0%,
			rgba(0, 212, 255, 0.1) 25%,
			rgba(0, 212, 255, 0.3) 50%,
			rgba(0, 212, 255, 0.1) 75%,
			rgba(0, 212, 255, 0.3) 100%);
	border-radius: 14px;
	z-index: -1;
	animation: revenueGlow 2s ease-in-out infinite;
}

/* Revenue Model 悬停效果 */
.revenue-hover-card:hover {
	border: 1px solid rgba(0, 212, 255, 0.5);
	background: rgba(0, 212, 255, 0.05);
	box-shadow:
		0 8px 32px rgba(0, 0, 0, 0.3),
		0 0 15px rgba(0, 212, 255, 0.2);
	transform: translateY(-2px);
}

/* Revenue Model 选中时的标题效果 */
.revenue-selected .chart-title {
	color: #00d4ff;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
	animation: titleGlow 1.5s ease-in-out infinite alternate;
}

/* Revenue Model 点击效果 */
.revenue-hover-card:active {
	transform: scale(0.98);
	transition: transform 0.1s ease;
}

/* Revenue Model 选中时的图表容器效果 */
.revenue-selected .chart-container {
	position: relative;
}

.revenue-selected .chart-container::after {
	content: '';
	/* position: absolute; */
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(45deg,
			transparent 0%,
			rgba(0, 212, 255, 0.1) 50%,
			transparent 100%);
	border-radius: 8px;
	animation: chartShimmer 2s ease-in-out infinite;
	pointer-events: none;
}

/* 图表闪烁效果 */
@keyframes chartShimmer {
	0% {
		opacity: 0;
		transform: translateX(-100%);
	}

	50% {
		opacity: 1;
		transform: translateX(0%);
	}

	100% {
		opacity: 0;
		transform: translateX(100%);
	}
}

.chart-title {
	font-weight: 700;
	margin-bottom: 12px;
	color: #ffffff;
	text-align: center;
	letter-spacing: 0.5px;
}

.chart-container {
	/* 高度由 Tailwind 类控制 */
	display: flex;
	align-items: end;
	gap: 5px;
	padding: 5px 0;
	overflow: hidden;
}

.revenue-echart {
	position: relative;
	width: 100%;
	height: 100%;
}

/* 策略卡片 */
.strategy-card {
	padding: 10px;
	flex: 1;
	overflow: visible;
	/* 移除 max-height 限制，确保内容全部显示 */
}

/* 自定义滚动条样式 */
.strategy-card::-webkit-scrollbar {
	width: 6px;
}

.strategy-card::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 3px;
}

.strategy-card::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.3);
	border-radius: 3px;
}

.strategy-card::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.5);
}

.strategy-card::-webkit-scrollbar-corner {
	background: transparent;
}


.strategy-title {
	font-weight: 600;
	margin-bottom: 13px;
	color: #ffffff;
}

.strategy-section {
	margin-bottom: clamp(12px, 1.5vh, 18px);
}

.strategy-section:last-child {
	margin-bottom: 0;
}

.strategy-subtitle {
	font-weight: 500;
	color: #ffffff;
	margin-bottom: clamp(6px, 0.8vh, 10px);
	line-height: 1.3;
}

.strategy-content {
	margin-left: 0;
}

.strategy-label {
	font-weight: 600;
	color: #ffffff;
	margin: clamp(5px, 0.6vh, 7px) 0 clamp(3px, 0.4vh, 4px) 0;
}

.strategy-text {
	line-height: 1.4;
	color: #cccccc;
	margin: clamp(3px, 0.4vh, 4px) 0;
}

/* SVG 覆盖层 */
.map-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 2;
}

/* SVG 标记点样式 */
.marker-svg {
	fill: #00d4ff;
	filter: drop-shadow(0 0 20px rgba(0, 212, 255, 1)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.6));
	/* animation: svgMarkerPulse 2s ease-in-out infinite; */
}

.marker-svg.marker-1 {
	animation-delay: 0s;
}

.marker-svg.marker-2 {
	animation-delay: 0.3s;
}

.marker-svg.marker-3 {
	animation-delay: 0.6s;
}

.map-background {
	position: relative;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at 30% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
}

/* .lake-outline {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	height: 60%;
	background: linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.3) 50%, transparent 70%);
	border-radius: 50% 30% 50% 30%;
	box-shadow:
		0 0 20px rgba(0, 212, 255, 0.5),
		inset 0 0 20px rgba(0, 212, 255, 0.2);
	animation: glow 3s ease-in-out infinite alternate;
} */

@keyframes glow {
	from {
		box-shadow:
			0 0 20px rgba(0, 212, 255, 0.5),
			inset 0 0 20px rgba(0, 212, 255, 0.2);
	}

	to {
		box-shadow:
			0 0 30px rgba(0, 212, 255, 0.8),
			inset 0 0 30px rgba(0, 212, 255, 0.4);
	}
}

/* Revenue Model 光晕动画 */
@keyframes revenueGlow {
	0% {
		opacity: 0.3;
		transform: scale(1);
	}

	50% {
		opacity: 0.6;
		transform: scale(1.01);
	}

	100% {
		opacity: 0.3;
		transform: scale(1);
	}
}

/* 标题发光动画 */
@keyframes titleGlow {
	0% {
		text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
	}

	100% {
		text-shadow: 0 0 20px rgba(0, 212, 255, 0.9), 0 0 30px rgba(0, 212, 255, 0.6);
	}
}

.map-markers {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.marker {
	position: absolute;
	width: 18px;
	height: 18px;
	background: radial-gradient(circle, #00d4ff 0%, #0099cc 60%, #006699 100%);
	border-radius: 50%;
	box-shadow:
		inset 0 0 8px rgba(255, 255, 255, 0.4),
		0 0 25px rgba(0, 212, 255, 1),
		0 0 50px rgba(0, 212, 255, 0.9),
		0 0 75px rgba(0, 212, 255, 0.7),
		0 0 100px rgba(0, 212, 255, 0.5),
		0 0 125px rgba(0, 212, 255, 0.3);
	animation: markerPulse 2s ease-in-out infinite;
	border: 2px solid rgba(255, 255, 255, 0.6);
}

.marker-1 {
	top: 20%;
	left: 25%;
	transform: translate(-50%, -50%);
}

.marker-2 {
	top: 45%;
	left: 65%;
	transform: translate(-50%, -50%);
}

.marker-3 {
	top: 70%;
	left: 80%;
	transform: translate(-50%, -50%);
}

@keyframes markerPulse {

	0%,
	100% {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
		box-shadow:
			inset 0 0 8px rgba(255, 255, 255, 0.4),
			0 0 25px rgba(0, 212, 255, 1),
			0 0 50px rgba(0, 212, 255, 0.9),
			0 0 75px rgba(0, 212, 255, 0.7),
			0 0 100px rgba(0, 212, 255, 0.5),
			0 0 125px rgba(0, 212, 255, 0.3);
	}

	50% {
		transform: translate(-50%, -50%) scale(1.3);
		opacity: 0.95;
		box-shadow:
			inset 0 0 12px rgba(255, 255, 255, 0.6),
			0 0 40px rgba(0, 212, 255, 1),
			0 0 80px rgba(0, 212, 255, 0.95),
			0 0 120px rgba(0, 212, 255, 0.8),
			0 0 160px rgba(0, 212, 255, 0.6),
			0 0 200px rgba(0, 212, 255, 0.4);
	}
}

@keyframes svgMarkerPulse {

	0%,
	100% {
		transform: scale(1);
		filter: drop-shadow(0 0 20px rgba(0, 212, 255, 1)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.6));
	}

	50% {
		transform: scale(1.3);
		filter: drop-shadow(0 0 30px rgba(0, 212, 255, 1)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.9)) drop-shadow(0 0 90px rgba(0, 212, 255, 0.7));
	}
}

@keyframes pulse {

	0%,
	100% {
		transform: scale(1);
		opacity: 1;
	}

	50% {
		transform: scale(1.2);
		opacity: 0.8;
	}
}

.map-overlays {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: auto;
}

.overlay-text {
	position: absolute;
	font-weight: 600;
	color: #ffffff;
	background: transparent;
	padding: 8px 12px;
	white-space: nowrap;
	cursor: pointer;
	z-index: 10;
	pointer-events: auto;
}

.overlay-text:hover {
	color: #00d4ff;
}

.overlay-1 {
	top: 70%;
	left: 20%;
	transform: translate(-50%, -50%);
}

.overlay-2 {
	top: 40%;
	left: 54%;
	transform: translate(-50%, -50%);
}

.overlay-3 {
	top: 65%;
	left: 70%;
	transform: translate(-50%, -50%);
}

/* 内容面板样式 */
.content-panel {
	/* 宽度由 Tailwind 类控制 */
	overflow-y: auto;
	height: calc(100vh - 180px - 100px);
	/* animation: slideIn 0.5s ease-out; */
	border: 1px solid rgba(0, 212, 255, 0.3);
	background: rgba(255, 255, 255, 0.005);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	padding: 10px;
	margin: 5px;
	position: fixed;
	top: 180px;
	right: 20px;
	bottom: 100px;
	transform: none;
	z-index: 1000;
}

/* 响应式布局 - 内容面板高度和位置 */
@media (max-width: 1024px) {
	.content-panel {
		height: calc(100vh - 100px - 100px);
		top: 100px;
		right: 10px;
	}
}

@media (max-width: 768px) {
	.content-panel {
		height: calc(100vh - 90px - 100px);
		top: 90px;
		right: 5px;
		padding: 8px;
	}
}



.main-title {
	font-weight: 600;
	color: #ffffff;
	/* margin-bottom 由 Tailwind 类控制 */
}

.section-title {
	/* font-weight: 600; */
	color: #ffffff;
	/* margin-bottom 由 Tailwind 类控制 */
	/* text-align: center; */
	/* background: rgba(0, 212, 255, 0.8); */
	padding: 6px 10px;
	/* border-radius: 4px; */
}

/* 需求图表容器 */
.demand-chart-container {
	position: relative;
	display: flex;
	justify-content: center;
	margin: 20px 0;
}

.demand-chart-container .demand-chart-echarts {
	width: 100%;
	height: 200px;
	/* height: 100%; */
}

.chart-labels {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.chart-label-left {
	position: absolute;
	left: 20px;
	top: 40%;
	transform: translateY(-50%);
}

.chart-label-right {
	position: absolute;
	right: 20px;
	top: 20%;
}

.chart-label-bottom {
	position: absolute;
	right: 20px;
	bottom: 20px;
}

.label-text {
	color: #ffffff;
	line-height: 1.2;
	margin: 2px 0;
}

/* 需求描述 */
.demand-description {
	margin-top: 8px;
}

.demand-description p {
	color: #cccccc;
	line-height: 1.3;
	margin: 3px 0;
	text-align: center;
}

/* 游客数据部分 */
/* margin-top 由 Tailwind 类控制 */

/* 数据列表 */
.data-list {
	margin-top: 12px;
}

.data-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 6px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-item:last-child {
	border-bottom: none;
}

.data-label {
	color: #ffffff;
	flex: 1;
	line-height: 1.2;
}

.data-value {
	font-weight: 600;
	color: #00d4ff;
	margin-left: 8px;
}


@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(100%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.back-btn {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 30px;
	cursor: pointer;
	color: #00d4ff;
	font-weight: 600;
	transition: all 0.3s ease;
}

.back-btn:hover {
	color: #ffffff;
	transform: translateX(-5px);
}


.content-title {
	/* font-weight: 700; */
	color: #ffffff;
	/* margin-bottom 由 Tailwind 类控制 */
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
	/* 字体大小由 Tailwind 类控制 */
}

.content-subtitle {
	font-weight: 500;
	color: #cccccc;
	/* margin-bottom 由 Tailwind 类控制 */
}

/* ECharts 圆环图样式 */
.pie-chart-container {
	display: flex;
	justify-content: center;
	margin: 20px 0;
}

.pie-chart-echarts {
	width: 140%;
	height: 160px;
}

.description-text {
	color: #cccccc;
	line-height: 1.6;
	/* margin 由 Tailwind 类控制 */
	text-align: center;
}

/* 柱状图样式 */
/* margin 由 Tailwind 类控制 */

.bar-row {
	display: flex;
	gap: 2px;
	margin-bottom: 10px;
	justify-content: center;
}

.bar-item {
	/* width 和 height 由 Tailwind 类控制 */
	border-radius: 2px;
}

.bar-item.filled {
	background: #19D8F3;
}

.bar-item.empty {
	background: rgba(255, 255, 255, 0.2);
}

/* 图例样式 */
.legend {
	margin-top: 20px;
}

.legend-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	/* padding: 10px 0; */
	/* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
}

.legend-item:last-child {
	border-bottom: none;
}

.legend-label {
	color: #cccccc;
	flex: 1;
	min-width: 0;
	word-break: break-word;
	overflow-wrap: break-word;
}

.legend-value {
	font-weight: 600;
	color: #00d4ff;
	flex-shrink: 0;
	white-space: nowrap;
}


/* Revenue Modal CSS removed - now in RevenueModal component */
.revenue-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(10px);
	z-index: 10002;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn 0.3s ease-out;
	padding: 100px 80px;
	box-sizing: border-box;
}

@media (max-width: 1920px) {
	.revenue-modal {
		padding: 60px 40px;
	}
}

.revenue-modal-content {
	width: 100%;
	height: 100%;
	padding: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
	padding-bottom: 20px;
	/* border-bottom: 2px solid #f0f0f0; */
}

.modal-title {
	font-weight: 700;
	color: #333333;
	margin: 0;
}

/* Page Navigation Styles */
.nav-btn {
	background: rgba(255, 255, 255, 0.8);
	border: none;
	border-radius: 50%;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease;
	color: #333;
	position: absolute;
	z-index: 20;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-btn:hover:not(.disabled) {
	background: rgba(255, 255, 255, 1);
	transform: scale(1.1);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.nav-btn.disabled {
	opacity: 0.4;
	cursor: not-allowed;
	background: rgba(255, 255, 255, 0.5);
}

/* 左侧上一页按钮 */
.nav-btn-left {
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 12px !important;
}

.nav-btn-left:hover:not(.disabled) {
	transform: translateY(-50%) scale(1.1);
}

/* 右侧下一页按钮 */
.nav-btn-right {
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 12px !important;
}

.nav-btn-right:hover:not(.disabled) {
	transform: translateY(-50%) scale(1.1);
}

/* 底部页面指示器 */
.page-indicators {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 12px;
	align-items: center;
	z-index: 20;
	background: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(10px);
	padding: 8px 16px;
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.6);
	cursor: pointer;
	transition: all 0.3s ease;
}

.page-dot.active {
	background: #00d4ff;
	transform: scale(1.4);
	box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
}

.page-dot:hover {
	background: rgba(255, 255, 255, 0.9);
	transform: scale(1.2);
}

.charts-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 20px;
	width: 100%;
	height: 100%;
	position: relative;
	padding: 20px;
	box-sizing: border-box;
}

.charts-grid.charts-grid-two {
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
}

.charts-grid.charts-grid-mixed {
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	gap: 30px;
}

.text-content {
	background: rgba(255, 255, 255, 0.9);
	padding: 30px;
	border-radius: 15px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(10px);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow-y: auto;
}

.text-title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin-bottom: 20px;
	text-align: center;
}

.text-body {
	font-size: 18px;
	line-height: 1.6;
	color: #555;
	text-align: left;
}

.text-body p {
	margin-bottom: 12px;
}

.text-body ul {
	margin: 12px 0;
	padding-left: 0;
	list-style: none;
}

.text-body ul li {
	margin-bottom: 8px;
	color: #666;
	padding-left: 16px;
}

.text-body strong {
	color: #333;
	font-weight: 600;
}

/* Investment Highlights Styling */
.investment-highlights .highlight-section {
	margin-bottom: 24px;
}

.investment-highlights .highlight-section h3 {
	font-size: 20px;
	color: #2c3e50;
	margin-bottom: 12px;
	line-height: 1.4;
}

.investment-highlights .highlight-section ul {
	margin-left: 20px;
}

.investment-highlights .highlight-section li {
	font-size: 18px;
	line-height: 1.7;
	margin-bottom: 10px;
	color: #34495e;
	padding-left: 8px;
}

/* .charts-grid::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	height: 1px;
	background-color: #ffffff;
	transform: translateY(-50%);
	z-index: 1;
} */

.charts-grid.charts-grid-two::before {
	display: none;
}

.charts-grid.charts-grid-two::after {
	content: '';
	position: absolute;
	top: 100px;
	bottom: 120px;
	left: 50%;
	width: 1px;
	background-color: #e0e0e0;
	transform: translateX(-50%);
	z-index: 1;
}

/* .charts-grid::after {
	content: '';
	position: absolute;
	top: 0;
	bottom: 0;
	left: 50%;
	width: 1px;
	background-color: #ffffff;
	transform: translateX(-50%);
	z-index: 1;
} */

.chart-item {
	background: transparent;
	border: none;
	border-radius: 0;
	padding: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	width: 100%;
	height: 100%;
	box-shadow: none;
}

.charts-grid-two .chart-item {
	padding: 0;
}

.chart-item-title {
	font-weight: 600;
	color: #333333;
	margin: 0 0 15px 0;
	text-align: center;
}

.modal-chart {
	width: 100%;
	height: 100%;
	min-height: 200px;
}

.charts-grid-two .modal-chart {
	min-height: 100%;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.9);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}

/* Financial Model 弹窗样式覆盖 */
.financial-modal-wrapper :deep(.revenue-modal) {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: transparent;
	backdrop-filter: none;
	padding: 0;
}

.financial-modal-wrapper :deep(.revenue-modal-content) {
	background: transparent;
	border: none;
	box-shadow: none;
	width: 100%;
	height: 100%;
}
</style>
