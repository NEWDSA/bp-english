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
							<div class="region-label text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px]">B</div>
							<div class="region-text text-lg sm:text-xl md:text-2xl">Business</div>
						</div>
					</div>
					<!-- C区域 - 右侧 -->
					<div class="region-c-right" @click="showCContentPanel">
						<div class="region-content">
							<div class="region-label text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px]">C</div>
							<div class="region-text text-lg sm:text-xl md:text-2xl">Consumer</div>
						</div>
					</div>
					<!-- 中间分割线 -->
					<div class="center-divider"></div>
				</div>
			</div>

			<!-- C方块的内容面板 - 全屏 -->
			<div class="c-content-panel" v-if="showCContent">
				<!-- 关闭按钮 -->
				<button
					@click="backToBlocks"
					class="button-focus absolute top-2 md:top-4 right-2 md:right-4 text-gray-300 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-2 md:p-2 z-50 transition-all duration-300 group">
					<img src="../assets/icon-17.png" alt="返回" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
				</button>

				<!-- 内容 -->
				<div class="c-content-wrapper">
					<!-- 图片左上角 -->
					<div class="content-section top-left">
						<h3 class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">High-end events such as competitions</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Participate in or sponsor high-end water sports events; <br/>organize product appreciation events and water driving experience days.</p>
					</div>
					<!-- 图片左下角 -->
					<div class="content-section bottom-left">
						<h3 class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Online platforms and digital touchpoints</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Official independent website (brand story/technical details/online test drive booking)<br/>Social media matrix: Instagram/YouTube/TikTok</p>
					</div>
					<!-- 中间图片 -->
					<div class="center-image-container">
						<img src="../assets/c_clinet_bg.png" alt="Hydrofoil Boat" class="center-image">
					</div>
					<!-- 图片右上角 -->
					<div class="content-section top-right">
						<h3 class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Industry exhibitions and media</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Participate in mainstream yacht shows<br/>Yacht industry association platform exposed</br>Leading industry media/KOL cooperation</p>
					</div>
					<!-- 图片右下角 -->
					<div class="content-section bottom-right">
						<h3 class="content-section-title text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Offline sales network</h3>
						<p class="section-text text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">Overseas Sales/Partnerships: <br/>Establishing partnerships with internationally renowned yacht dealers<br/>Domestic channels: <br/>Establish a presence in high-end yacht clubs and collaborate with upscale tourist resorts.</p>
					</div>
				</div>
			</div>

			<!-- B方块的内容面板 - 全屏 -->
			<div class="b-content-panel" v-if="showBContent">
				<!-- 关闭按钮 -->
				<button
					@click="backToBlocks"
					class="button-focus absolute top-8 md:top-30 right-8 md:right-4 text-gray-300 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-2 md:p-2 z-50 transition-all duration-300 group">
					<img src="../assets/icon-17.png" alt="返回" class="w-6 h-6">
				</button>

				<!-- B方块显示主要内容 -->
				<div class="main-content">
					<!-- 左侧面板：Revenue Model + Channel Strategy -->
					<div class="left-panel !w-[550px] !min-w-[550px] !max-w-[550px]">
						<!-- 收入模型图表 -->
						<div class="chart-card revenue-hover-card w-[514px] h-[304px]" :class="{ 'revenue-selected': isRevenueSelected }"
							@click="showContent('revenue')">
							<h3 class="chart-title text-[20px]">Revenue Model</h3>
							<div class="chart-container h-[230px]">
								<div ref="revenueChartRef" class="revenue-echart"></div>
							</div>
						</div>

						<!-- 渠道策略 -->
						<div class="strategy-card">
							<h3 class="strategy-title text-[26px]">Channel Strategy</h3>

							<div class="strategy-section">
								<div class="strategy-subtitle text-[22px] whitespace-nowrap">Domestic (B-end water area operator)</div>
								<div class="strategy-content">
									<p class="strategy-label text-[21px]">Positioning:</p>
									<p class="strategy-text text-[18px]">To provide a full cycle hydrofoil operation solution for
										scenic
										spots, passenger transport companies, and hotels.</p>

									<p class="strategy-label text-[21px]">Core module:</p>
									<p class="strategy-text text-[18px]">Fleet operation and maintenance (equipment support)+safety
										management (real-time monitoring)</p>
									<p class="strategy-text text-[18px]">Product operation (leasing system)+dock support
										(infrastructure
										support)</p>
								</div>
							</div>

							<div class="strategy-section">
								<h4 class="strategy-subtitle text-[22px]">Overseas business (C-end private enterprises/private berth
									users)
								</h4>
								<div class="strategy-content">
									<p class="strategy-label text-[21px]">Positioning:</p>
									<p class="strategy-text text-[18px]">To build an intelligent hydrofoil boat lifestyle ecosystem
										for
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
						<!-- 内容面板 -->
						<div class="content-panel w-[614px]" v-if="activeContent && activeContent !== 'revenue'">
							<!-- Lake Como 案例内容 -->
							<div v-if="activeContent === 'lake' && !showLakeDetail" class="lake-content"
								@click="showLakeDetailPanel">
								<div class="content-title text-[26px] mb-[10.67px]">The case of Lake Como</div>
								<div class="content-subtitle text-[18px] mb-[26.67px]">Daily average number of tourists</div>

								<!-- ECharts 圆环图 -->
								<div class="pie-chart-container">
									<div ref="pieChartRef" class="pie-chart-echarts"></div>
								</div>

								<!-- 描述文字 -->
								<p class="description-text text-[18px] my-[26.67px]">
									Each hotel has an average of 100 rooms, totaling 400 rooms, calculated based on the
									number
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
							<div v-if="activeContent === 'lake' && showLakeDetail" class="lake-content"
								@click="hideContent">
								<!-- Transportation Demand 部分 -->
								<div class="transportation-demand-section">
								<div class="main-title text-xs sm:text-sm md:text-base mb-[13px]">Daily average number of boat tourists</div>
								<div class="section-title text-[18px] mb-[13px]">Transportation Demand</div>

									<!-- ECharts 半环形图 -->
									<div class="demand-chart-container">
										<div ref="demandChartRef" class="demand-chart-echarts"></div>
										<!-- 引导线连接的文字 -->
										<div class="chart-labels">
											<div class="chart-label-left">
												<div class="label-text">Daily transportation demand</div>
												<div class="label-text">in the lake area</div>
											</div>
											<div class="chart-label-right">
												<div class="label-text text-xs sm:text-sm md:text-base">Connection Requirements</div>
											</div>
											<div class="chart-label-bottom">
												<div class="label-text text-xs sm:text-sm md:text-base">Other Requirements</div>
											</div>
										</div>
									</div>
									<!-- 描述文字 -->
									<div class="demand-description">
										<p class="text-[10px] sm:text-xs md:text-sm">Each ship has a passenger capacity of 4 people</p>
										<p class="text-[10px] sm:text-xs md:text-sm">The total demand for hydrofoil boats is 25-38</p>
									</div>
								</div>

								<!-- 游客数据部分 -->
								<div class="tourist-data-section mt-[12px]">
									<div class="section-title mb-[13px]">The daily average number of tourists taking boats on Lake
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
											<span class="data-label text-[10px] sm:text-xs md:text-sm whitespace-nowrap">Proportion of boat tourists during the off-season (7.5%)</span>
											<span class="data-value text-[10px] sm:text-xs md:text-sm whitespace-nowrap">750 people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span class="data-label text-[10px] sm:text-xs md:text-sm whitespace-nowrap">During the off-season, tourists staying overnight use boats (75%)</span>
											<span class="data-value text-[10px] sm:text-xs md:text-sm whitespace-nowrap">450 people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span class="data-label text-[10px] sm:text-xs md:text-sm whitespace-nowrap">Proportion of boat tourists during peak season (7.5%)</span>
											<span class="data-value text-[10px] sm:text-xs md:text-sm whitespace-nowrap">1312 people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span class="data-label text-[10px] sm:text-xs md:text-sm whitespace-nowrap">Tourists staying overnight during peak season use boats (75%)</span>
											<span class="data-value text-[10px] sm:text-xs md:text-sm whitespace-nowrap">900 people</span>
										</div>
										<div class="data-item mb-[6px]">
											<span class="data-label text-[10px] sm:text-xs md:text-sm whitespace-nowrap">Average daily number of boat tourists during the off-season</span>
											<span class="data-value text-[10px] sm:text-xs md:text-sm whitespace-nowrap">1200 people</span>
										</div>
										<div class="data-item">
											<span class="data-label text-[10px] sm:text-xs md:text-sm whitespace-nowrap">Average daily number of boat tourists during peak season</span>
											<span class="data-value text-[10px] sm:text-xs md:text-sm whitespace-nowrap">2212 people</span>
										</div>
									</div>
								</div>
							</div>

							<!-- 其他内容面板可以在这里添加 -->
							<div v-if="activeContent === 'tourists'" class="tourists-content">
								<div class="content-title text-base sm:text-lg md:text-xl lg:text-2xl">Daily average number of boat tourists</div>
								<p class="text-xs sm:text-sm md:text-base">Tourist data content will be displayed here.</p>
							</div>

							<div v-if="activeContent === 'profit'" class="profit-content">
								<div class="content-title text-base sm:text-lg md:text-xl lg:text-2xl">Operating profit and loss statement</div>
								<p class="text-xs sm:text-sm md:text-base">Profit and loss data will be displayed here.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Revenue Model 弹窗 -->
		<div class="revenue-modal" v-if="activeContent === 'revenue'" @click="hideContent">
			<div class="revenue-modal-content" @click.stop>
				<button class="close-btn" @click="hideContent">×</button>

				<!-- 页面导航 - 上一页按钮 (左侧) -->
				<p
					class="nav-btn prev-btn nav-btn-left"
					:class="{ 'disabled': currentRevenuePage === 1 }"
					@click="prevRevenuePage"
					:disabled="currentRevenuePage === 1">
					<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</p>

				<!-- 页面导航 - 下一页按钮 (右侧) -->
				<p
					class="nav-btn next-btn nav-btn-right"
					:class="{ 'disabled': currentRevenuePage === 4 }"
					@click="nextRevenuePage"
					:disabled="currentRevenuePage === 4">
					<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</p>

				<!-- 页面指示器 (底部中心) -->
				<div class="page-indicators">
					<span
						v-for="page in 4"
						:key="page"
						class="page-dot"
						:class="{ 'active': currentRevenuePage === page }"
						@click="goToRevenuePage(page)">
					</span>
				</div>

				<!-- 页面1: 现有的图表1和图表2 -->
				<div v-if="currentRevenuePage === 1" class="charts-grid charts-grid-two">
					<div class="chart-item">
						<div ref="chart1Ref" class="modal-chart"></div>
					</div>
					<div class="chart-item">
						<div ref="chart2Ref" class="modal-chart"></div>
					</div>
				</div>

				<!-- 页面2: 新增图表3和图表4 -->
				<div v-if="currentRevenuePage === 2" class="charts-grid charts-grid-two">
					<div class="chart-item">
						<!-- 各年销售情况 -->
						<div ref="chart3NewRef" class="modal-chart"></div>
					</div>
					<div class="chart-item">
						<!--  Profit Statement / 利润表 -->
						<div ref="chart4NewRef" class="modal-chart"></div>
					</div>
				</div>

				<!-- 页面3: 新增图表5和图表6 -->
				<div v-if="currentRevenuePage === 3" class="charts-grid charts-grid-two">
					<!-- 投资回报分析 (基于500万欧元总投资) -->
					<div class="chart-item">
						<div ref="chart5NewRef" class="modal-chart"></div>
					</div>
					<!-- Cash Flow Analysis / 现金流分析 -->
					<div class="chart-item">
						<div ref="chart6NewRef" class="modal-chart"></div>
					</div>
				</div>

				<!-- 页面4: 左侧图表7，右侧文字 -->
				<div v-if="currentRevenuePage === 4" class="charts-grid charts-grid-mixed">
					<!-- 关键绩效指标 -->
					<div class="chart-item">
						<div ref="chart7NewRef" class="modal-chart"></div>
					</div>
					<!-- 投资亮点 -->
					<div class="text-content">
						<h2 class="text-title">Investment Highlights</h2>
						<div class="text-body investment-highlights">
							<div class="highlight-section">
								<h3><strong>1. Extremely High Profitability</strong></h3>
								<ul>
									<li>a. Stable 88.6% gross margin across three years</li>
									<li>b. Total net profit reaches €125.62 million in three years</li>
								</ul>
							</div>

							<div class="highlight-section">
								<h3><strong>2. Outstanding Investment Returns</strong></h3>
								<ul>
									<li>a. First-year ROI reaches 223.5%, recovering initial investment</li>
									<li>b. Cumulative ROI exceeds 25x by the third year</li>
								</ul>
							</div>

							<div class="highlight-section">
								<h3><strong>3. Strong Cash Flow Generation</strong></h3>
								<ul>
									<li>a. Operating cash flow reaches €126.5 million in three years</li>
									<li>b. Positive cash flow from the first year</li>
								</ul>
							</div>

							<div class="highlight-section">
								<h3><strong>4. Significant Growth Potential</strong></h3>
								<ul>
									<li>a. Revenue grows exponentially from €16.8M to €104M</li>
									<li>b. Clear economies of scale demonstrated</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- 顶部导航栏 -->
		<TopNavigation />

		<!-- 主要内容区域 - 只在覆盖层完全关闭时显示 -->
		<div class="main-content" v-if="!showOverlay">
			<!-- 左侧面板：Revenue Model + Channel Strategy -->
			<div class="left-panel">
				<!-- 收入模型图表 -->
				<div class="chart-card revenue-hover-card w-[514px] h-[304px]" :class="{ 'revenue-selected': isRevenueSelected }"
					@click="showContent('revenue')">
					<h3 class="chart-title text-[20px]">Revenue Model</h3>
					<div class="chart-container">
						<div ref="revenueChartRef" class="revenue-echart"></div>
					</div>
				</div>


				<!-- 渠道策略 -->
				<div class="strategy-card">
					<h3 class="strategy-title text-[26px]">Channel Strategy</h3>

					<div class="strategy-section">
						<div class="strategy-subtitle text-[22px] whitespace-nowrap">Domestic (B-end water area operator)</div>
						<div class="strategy-content">
							<p class="strategy-label text-[21px]">Positioning:</p>
							<p class="strategy-text text-[18px]">To provide a full cycle hydrofoil operation solution for scenic
								spots, passenger transport companies, and hotels.</p>

							<p class="strategy-label text-[21px]">Core module:</p>
							<p class="strategy-text text-[18px]">Fleet operation and maintenance (equipment support)+safety
								management (real-time monitoring)</p>
							<p class="strategy-text text-[18px]">Product operation (leasing system)+dock support (infrastructure
								support)</p>
						</div>
					</div>

					<div class="strategy-section">
						<h4 class="strategy-subtitle text-[22px]">Overseas business (C-end private enterprises/private berth users)
						</h4>
						<div class="strategy-content">
							<p class="strategy-label text-[21px]">Positioning:</p>
							<p class="strategy-text text-[18px]">To build an intelligent hydrofoil boat lifestyle ecosystem for
								middle-class private berth users.</p>

							<p class="strategy-label text-[21px]">Core module:</p>
							<p class="strategy-text text-[18px]">Map service (navigation planning)+APP service (remote control)</p>
							<p class="strategy-text text-[18px]">Additional services (customized maintenance/social functions)</p>
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
						<div class="content-title text-[26px] mb-[10.67px]">The case of Lake Como</div>
						<div class="content-subtitle text-[18px] mb-[26.67px]">Daily average number of tourists</div>

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
								<div class="main-title text-xs sm:text-sm md:text-base mb-[13px]">Daily average number of boat tourists</div>
								<div class="section-title text-[18px] mb-[13px]">Transportation Demand</div>

							<!-- ECharts 半环形图 -->
							<div class="demand-chart-container">
								<div ref="demandChartRef" class="demand-chart-echarts"></div>
								<!-- 引导线连接的文字 -->
								<div class="chart-labels">
									<div class="chart-label-left">
										<div class="label-text text-xs sm:text-sm md:text-base">Daily transportation demand</div>
										<div class="label-text text-xs sm:text-sm md:text-base">in the lake area</div>
									</div>
									<div class="chart-label-right">
										<div class="label-text text-xs sm:text-sm md:text-base">Connection Requirements</div>
									</div>
									<div class="chart-label-bottom">
										<div class="label-text text-xs sm:text-sm md:text-base">Other Requirements</div>
									</div>
								</div>
							</div>
							<!-- 描述文字 -->
							<div class="demand-description">
								<p>Each ship has a passenger capacity of 4 people</p>
								<p>The total demand for hydrofoil boats is 25-38</p>
							</div>
						</div>

						<!-- 游客数据部分 -->
						<div class="tourist-data-section mt-[12px]">
									<div class="section-title text-[11px] sm:text-xs md:text-sm mb-[13px]">The daily average number of tourists taking boats on Lake Como,
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
									<span class="data-label whitespace-nowrap">Proportion of boat tourists during the off-season (7.5%)</span>
									<span class="data-value whitespace-nowrap">750 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label whitespace-nowrap">During the off-season, tourists staying overnight use boats (75%)</span>
									<span class="data-value whitespace-nowrap">450 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label whitespace-nowrap">Proportion of boat tourists during peak season (7.5%)</span>
									<span class="data-value whitespace-nowrap">1312 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label whitespace-nowrap">Tourists staying overnight during peak season use boats (75%)</span>
									<span class="data-value whitespace-nowrap">900 people</span>
								</div>
								<div class="data-item mb-[6px]">
									<span class="data-label whitespace-nowrap">Average daily number of boat tourists during the off-season</span>
									<span class="data-value whitespace-nowrap">1200 people</span>
								</div>
								<div class="data-item">
									<span class="data-label whitespace-nowrap">Average daily number of boat tourists during peak season</span>
									<span class="data-value whitespace-nowrap">2212 people</span>
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
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import TopNavigation from '../components/TopNavigation.vue';

const router = useRouter()

// 内容面板状态
const activeContent = ref(null)
const showLakeDetail = ref(false)
const isRevenueSelected = ref(false)

// Page navigation functions
function prevRevenuePage() {
	if (currentRevenuePage.value > 1) {
		currentRevenuePage.value--
		nextTick(() => {
			renderModalCharts()
		})
	}
}

function nextRevenuePage() {
	if (currentRevenuePage.value < 4) {
		currentRevenuePage.value++
		nextTick(() => {
			renderModalCharts()
		})
	}
}

function goToRevenuePage(page) {
	if (page >= 1 && page <= 4) {
		currentRevenuePage.value = page
		nextTick(() => {
			renderModalCharts()
		})
	}
}

// 覆盖层状态
const showOverlay = ref(true)
const showCContent = ref(false)
const showBContent = ref(false)

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

	// 如果是revenue类型，渲染模态框图表
	if (contentType === 'revenue') {
		renderModalCharts()
	}
	// 如果是lake类型，渲染饼图
	else if (contentType === 'lake') {
		renderPieChart()
		// 如果显示详情面板，也渲染需求图表
		if (showLakeDetail.value) {
			renderDemandChart()
		}
	}
}

// 隐藏内容面板
function hideContent() {
	activeContent.value = null
	showLakeDetail.value = false
	isRevenueSelected.value = false
	currentRevenuePage.value = 1 // Reset to first page
}

// 显示Lake详情面板
function showLakeDetailPanel() {
	showLakeDetail.value = true
	// 等待DOM更新后渲染需求图表
	nextTick(() => {
		renderDemandChart()
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

// Revenue Modal Charts
const chart1Ref = ref(null)
const chart2Ref = ref(null)
const chart3Ref = ref(null)
const chart4Ref = ref(null)
let chart1Instance = null
let chart2Instance = null
let chart3Instance = null
let chart4Instance = null

// New charts for additional pages
const chart3NewRef = ref(null)
const chart4NewRef = ref(null)
const chart5NewRef = ref(null)
const chart6NewRef = ref(null)
const chart7NewRef = ref(null)
let chart3NewInstance = null
let chart4NewInstance = null
let chart5NewInstance = null
let chart6NewInstance = null
let chart7NewInstance = null

// Page navigation
const currentRevenuePage = ref(1)

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

// 渲染模态框图表
function renderModalCharts() {
	// 获取屏幕宽度用于响应式字体大小
	const screenWidth = window.innerWidth
	// 根据屏幕宽度动态计算字体大小
	const getTitleFontSize = () => {
		if (screenWidth <= 1440) return 12
		if (screenWidth <= 1680) return 13
		if (screenWidth <= 1920) return 16
		return 20
	}

	const getAxisLabelFontSize = () => {
		if (screenWidth <= 1440) return 10
		if (screenWidth <= 1680) return 12
		if (screenWidth <= 1920) return 14
		return 16
	}

	const getSeriesLabelFontSize = () => {
		if (screenWidth <= 1440) return 12
		if (screenWidth <= 1680) return 12
		if (screenWidth <= 1920) return 16
		return 18
	}

	const getLegendFontSize = () => {
		if (screenWidth <= 1440) return 10
		if (screenWidth <= 1680) return 10
		if (screenWidth <= 1920) return 11
		return 12
	}

	const getGraphicFontSize = () => {
		if (screenWidth <= 1440) return 10
		if (screenWidth <= 1680) return 10
		if (screenWidth <= 1920) return 11
		return 12
	}

	// Chart 1: 左上角 - 年度数据柱状图（蓝色和橙色）
	if (chart1Ref.value) {
		// 销毁旧实例
		if (chart1Instance) {
			chart1Instance.dispose()
			//strategicPlanner
			//engineer_bg.png
		}
		// 重新创建实例
		//3840.2160
		chart1Instance = echarts.init(chart1Ref.value)

		const titleFontSize = getTitleFontSize()
		const axisLabelFontSize = getAxisLabelFontSize()
		const seriesLabelFontSize = getSeriesLabelFontSize()
		const legendFontSize = getLegendFontSize()
		const graphicFontSize = getGraphicFontSize()

		const option1 = {
			title: {
				text: 'When the cost of three single-unit ships is €21,000, the break-even sales volume is reached',
				textStyle: { fontSize: titleFontSize, color: '#333', fontWeight: 'normal' },
				top: screenWidth <= 1280 ? 30 : 50,
				left: 'center'
			},
			grid: {
				top: screenWidth <= 1280 ? 80 : 100,
				bottom: screenWidth <= 1280 ? 120 : 160,
				left: screenWidth <= 1280 ? 40 : 50,
				right: screenWidth <= 1280 ? 40 : 50
			},

			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: screenWidth <= 1920 ? '10%' : '6%',
				textStyle: { fontSize: legendFontSize },
				left: 'center',
				itemGap: screenWidth <= 1920 ? 20 : 40
			},
			graphic: {
				type: 'text',
				left: '40',
				bottom: screenWidth <= 1920 ? '10%' : '7%',
				style: {
					text: 'Horizontal axis (Price: Euro)',
					fontSize: graphicFontSize,
					color: '#666',
					textAlign: 'left',
					textVerticalAlign: 'middle'
				}
			},
			xAxis: {
				type: 'category',
				data: ['145,000', '140,000', '135,000', '130,000', '125,000', '120,000', '115,000', '110,000', '105,000', '100,000', '95,000'],
				axisLabel: {
					color: '#666',
					fontSize: axisLabelFontSize,
					show: true,
					margin: screenWidth <= 1280 ? 15 : 20,
					interval: 0,  // 强制显示所有标签
					rotate: screenWidth <= 1280 ? 45 : 0,    // 小屏幕旋转标签
					formatter: function(value, index) {
						// 120,000 is at index 5
						if (index === 5) {
							return '{highlight|' + value + '}';
						}
						return value;
					},
					rich: {
						highlight: {
							color: '#00d3f3',
							fontSize: axisLabelFontSize,
						}
					}
				},
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			yAxis: [
				{
					type: 'value',
					position: 'left',
					min: 0,
					max: 30,
					show: false,
					axisLabel: { show: false },
					axisTick: { show: false },
					axisLine: { show: false },
					splitLine: { show: false }
				},
				{
					type: 'value',
					position: 'right',
					min: 60,
					max: 80,
					show: false,
					axisLabel: { show: false },
					axisTick: { show: false },
					axisLine: { show: false },
					splitLine: { show: false }
				}
			],
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'bar',
					yAxisIndex: 0,
					data: [4.4, 4.6, 4.8, 5.1, 5.3, 5.6, 5.9, 6.2, 6.6, 7.1, 7.6],
					itemStyle: { color: '#00d4ff' },
					label: {
						show: true,
						position: 'top',
						fontSize: seriesLabelFontSize,
						formatter: function(params) {
							// 5.6 is at index 5
							if (params.dataIndex === 5) {
								return '{highlight|' + params.value + '}';
							}
							return params.value;
						},
						rich: {
							highlight: {
								color: '#00d3f3',
								fontSize: seriesLabelFontSize,
							}
						}
					}
				},
				{
					name: 'Gross profit margin',
					type: 'bar',
					yAxisIndex: 1,
					data: [75.5, 75.0, 74.4, 73.8, 73.2, 72.5, 71.7, 70.9, 70.0, 69.0, 67.9],
					itemStyle: { color: '#FFC27A' },
					label: {
						show: true,
						position: 'top',
						fontSize: seriesLabelFontSize,
						formatter: function(params) {
							// 72.5% is at index 5
							if (params.dataIndex === 5) {
								return '{highlight|' + params.value + '%}';
							}
							return params.value + '%';
						},
						rich: {
							highlight: {
								color: '#00d3f3',
								fontSize: seriesLabelFontSize,
							}
						}
					}
				}
			]
		}
		chart1Instance.setOption(option1)
		// 确保图表正确显示
		setTimeout(() => {
			chart1Instance?.resize()
		}, 50)
	}

	// Chart 2: 右上角 - 年度数据柱状图（蓝色和橙色）
	if (chart2Ref.value) {
		// 销毁旧实例
		if (chart2Instance) {
			chart2Instance.dispose()
		}
		// 重新创建实例
		chart2Instance = echarts.init(chart2Ref.value)

		// 使用之前定义的响应式字体大小函数
		const titleFontSize = getTitleFontSize()
		const axisLabelFontSize = getAxisLabelFontSize()
		const seriesLabelFontSize = getSeriesLabelFontSize()
		const legendFontSize = getLegendFontSize()
		const graphicFontSize = getGraphicFontSize()

		const option2 = {
			title: {
				text: 'When the cost of a five-seat version single boat is €36,500, the break-even sales volume is reached',
				textStyle: { fontSize: titleFontSize, color: '#333', fontWeight: 'normal' },
				top: screenWidth <= 1280 ? 30 : 50,
				left: 'center'
			},
			grid: {
				top: screenWidth <= 1280 ? 80 : 100,
				bottom: screenWidth <= 1280 ? 120 : 160,
				left: screenWidth <= 1280 ? 40 : 50,
				right: screenWidth <= 1280 ? 40 : 50
			},
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: screenWidth <= 1920 ? '10%' : '6%',
				textStyle: { fontSize: legendFontSize },
				left: 'center',
				itemGap: screenWidth <= 1920 ? 20 : 40
			},
			graphic: {
				type: 'text',
				left: '40',
				bottom: screenWidth <= 1920 ? '10%' : '7%',
				style: {
					text: 'Horizontal axis (Price: Euro)',
					fontSize: graphicFontSize,
					color: '#666',
					textAlign: 'left',
					textVerticalAlign: 'middle'
				}
			},
			xAxis: {
				type: 'category',

				data: ['225,000', '220,000', '215,000', '210,000', '205,000', '200,000', '195,000', '190,000', '185,000', '180,000', '175,000'],
				axisLabel: {
					color: '#666',
					fontSize: axisLabelFontSize,
					show: true,
					margin: screenWidth <= 1280 ? 15 : 20,
					interval: 0,  // 强制显示所有标签
					rotate: screenWidth <= 1280 ? 45 : 0,    // 小屏幕旋转标签
					formatter: function(value, index) {
						// 200,000 is at index 5
						if (index === 5) {
							return '{highlight|' + value + '}';
						}
						return value;
					},
					rich: {
						highlight: {
							color: '#00d3f3',
							fontSize: axisLabelFontSize,
						}
					}
				},
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			yAxis: [
				{
					type: 'value',
					position: 'left',
					min: 0,
					max: 20,
					show: false,
					axisLabel: { show: false },
					axisTick: { show: false },
					axisLine: { show: false },
					splitLine: { show: false }
				},
				{
					type: 'value',
					position: 'right',
					min: 65,
					max: 75,
					show: false,
					axisLabel: { show: false },
					axisTick: { show: false },
					axisLine: { show: false },
					splitLine: { show: false }
				}
			],
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'bar',
					yAxisIndex: 0,
					data: [2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.9, 4.0],
					itemStyle: { color: '#00d4ff' },
					label: {
						show: true,
						position: 'top',
						fontSize: seriesLabelFontSize,
						formatter: function(params) {
							// 3.4 is at index 5
							if (params.dataIndex === 5) {
								return '{highlight|' + params.value + '}';
							}
							return params.value;
						},
						rich: {
							highlight: {
								color: '#00d3f3',
								fontSize: seriesLabelFontSize,
							}
						}
					}
				},
				{
					name: 'Gross profit margin',
					type: 'bar',
					yAxisIndex: 1,
					// data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
					data: [73.8, 73.4, 73.0, 72.6, 72.2, 71.8, 71.3, 70.8, 70.3, 69.7, 69.1],
					itemStyle: { color: '#FFC27A' },
					label: {
						show: true,
						position: 'top',
						fontSize: seriesLabelFontSize,
						formatter: function(params) {
							// 71.8% is at index 5
							if (params.dataIndex === 5) {
								return '{highlight|' + params.value + '%}';
							}
							return params.value + '%';
						},
						rich: {
							highlight: {
								color: '#00d3f3',
								fontSize: seriesLabelFontSize,
							}
						}
					}
				}
			]
		}
		chart2Instance.setOption(option2)
		// 确保图表正确显示
		setTimeout(() => {
			chart2Instance?.resize()
		}, 50)
	}

	// Chart 3: 左下角 - 面积图
	if (chart3Ref.value) {
		// 销毁旧实例
		if (chart3Instance) {
			chart3Instance.dispose()
		}
		// 重新创建实例
		chart3Instance = echarts.init(chart3Ref.value)
		const option3 = {
			title: {
				text: 'When the cost of a single ship is 35,000$, break even sales volume is achieved',
				textStyle: { fontSize: 16, color: '#333', fontWeight: 'normal' },
				top: 5,
				left: 'center'
			},
			grid: {
				top: 50,
				bottom: 80,
				left: 40,
				right: 40,
				show: false
			},
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: '1%',
				textStyle: { fontSize: '1vw' },
				left: 'center',
				itemGap: 20
			},
			graphic: {
				type: 'text',
				left: '40',
				bottom: '25',
				style: {
					text: 'Horizontal axis (Price: US Dollars)',
					fontSize: 10,
					color: '#666',
					textAlign: 'left',
					textVerticalAlign: 'middle'
				}
			},
			xAxis: {
				type: 'category',
				data: [
					'80,000', '78,600', '77,100', '75,700', '74,300',
					'72,900', '71,400', '70,000', '68,600', '67,100',
					'65,700', '64,200', '62,900', '61,400', '60,000'
				],
				position: 'bottom',
				axisLabel: {
					show: true,
					fontSize: 8,
					color: '#666',
					interval: 0,
					margin: 5,
					align: 'center',
					verticalAlign: 'bottom',
					offset: 0
				},
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: {
					show: true,
					lineStyle: { color: 'rgba(150, 150, 150, 0.8)', width: 1 }
				},
				boundaryGap: false
			},
			yAxis: [
				{
					type: 'value',
					// name: 'Units',
					position: 'left',
					axisLabel: { show: false },
					axisTick: { show: false },
					axisLine: { show: false },
					splitLine: { show: false }
				},
				{
					type: 'value',
					// name: 'Profit %',
					min: 0,
					max: 100,
					position: 'right',
					axisLabel: { show: false },
					axisTick: { show: false },
					axisLine: { show: false },
					splitLine: { show: false }
				}
			],
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'line',
					data: [16, 17, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 29, 31, 34],
					yAxisIndex: 0,
					smooth: 0,
					lineStyle: {
						color: '#1ed5e6',
						width: 2
					},
					itemStyle: {
						color: '#1ed5e6',
						borderWidth: 1,
						borderColor: '#ffffff'
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
							{ offset: 0, color: 'rgba(30, 213, 230, 0.1)' },
							{ offset: 0.3, color: 'rgba(30, 213, 230, 0.3)' },
							{ offset: 0.7, color: 'rgba(30, 213, 230, 0.6)' },
							{ offset: 1, color: 'rgba(30, 213, 230, 0.8)' }
						])
					},
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}',
						offset: [0, -3]
					}
				},
				{
					name: 'Gross profit margin',
					type: 'line',
					data: [40, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 29, 28, 27, 25],
					yAxisIndex: 1,
					smooth: 0,
					lineStyle: {
						color: '#f5a623',
						width: 2
					},
					itemStyle: {
						color: '#f5a623',
						borderWidth: 1,
						borderColor: '#ffffff'
					},
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}%',
						offset: [0, -3]
					}
				}
			]
		};

		chart3Instance.setOption(option3)
		// 确保图表正确显示
		setTimeout(() => {
			chart3Instance?.resize()
		}, 50)
	}

	// Chart 4: 右下角 - 面积图
	if (chart4Ref.value) {
		// 销毁旧实例
		if (chart4Instance) {
			chart4Instance.dispose()
		}
		// 重新创建实例
		chart4Instance = echarts.init(chart4Ref.value)
		const option4 = {
			title: {
				text: 'When the cost of a single ship is 41,000$, break even sales volume is achieved',
				textStyle: { fontSize: 16, color: '#333', fontWeight: 'normal' },
				top: 5,
				left: 'center'
			},
			grid: {
				top: 50,
				bottom: 80,
				left: 40,
				right: 40,
				show: false
			},
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: '1%',
				textStyle: { fontSize: '1vw' },
				left: 'center',
				itemGap: 20
			},
			graphic: {
				type: 'text',
				left: '40',
				bottom: '25',
				style: {
					text: 'Horizontal axis (Price: US Dollars)',
					fontSize: 10,
					color: '#666',
					textAlign: 'left',
					textVerticalAlign: 'middle'
				}
			},
			xAxis: {
				type: 'category',
				data: ['95,700', '94,300', '92,900', '91,400', '90,000', '88,600', '87,100', '85,700', '84,300', '82,900', '81,400', '80,000', '78,600', '77,100', '75,700'],
				position: 'bottom',
				axisLabel: {
					show: true,
					fontSize: 8,
					color: '#666',
					interval: 0,
					margin: 5,
					align: 'center',
					verticalAlign: 'top'
				},
				axisTick: {
					show: false
				},
				axisLine: { show: false },
				splitLine: {
					show: true,
					lineStyle: { color: 'rgba(150, 150, 150, 0.8)', width: 1 }
				},
				boundaryGap: false
			},
			yAxis: [{
				type: 'value',
				min: 0,
				max: 100,
				axisLabel: {
					show: false
				},
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: {
					show: false
				}
			},
			{
				type: 'value',
				position: 'right',
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			}],
			series: [
				{
					name: 'Gross profit margin',
					type: 'line',
					z: 1,
					yAxisIndex: 1,
					data: [45, 44, 44, 43, 42, 42, 41, 40, 39, 38, 37, 36, 36, 34, 33],
					smooth: true,
					symbol: 'circle',
					symbolSize: 3,
					lineStyle: {
						color: '#f5a623',
						width: 2
					},
					itemStyle: {
						color: '#f5a623',
						borderWidth: 1,
						borderColor: '#ffffff'
					},
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}%',
						fontWeight: 'normal',
						offset: [0, -3]
					}
				},
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'line',
					z: 3,
					yAxisIndex: 0,
					data: [13, 14, 14, 15, 15, 16, 16, 17, 18, 19, 20, 21, 23, 24, 26],
					smooth: true,
					symbol: 'circle',
					symbolSize: 3,
					lineStyle: {
						color: '#1ed5e6',
						width: 2
					},
					itemStyle: {
						color: '#1ed5e6',
						borderWidth: 1,
						borderColor: '#ffffff'
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
							{ offset: 0, color: 'rgba(30, 213, 230, 0.1)' },
							{ offset: 0.3, color: 'rgba(30, 213, 230, 0.3)' },
							{ offset: 0.7, color: 'rgba(30, 213, 230, 0.6)' },
							{ offset: 1, color: 'rgba(30, 213, 230, 0.8)' }
						])
					},
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}',
						fontWeight: 'normal',
						offset: [0, -3]
					}
				}
			]
		}
		chart4Instance.setOption(option4)
		// 确保图表正确显示
		setTimeout(() => {
			chart4Instance?.resize()
		}, 50)
	}

	// 根据当前页面渲染对应的图表
	if (currentRevenuePage.value === 1) {
		// Page 1: existing charts already rendered above
	} else if (currentRevenuePage.value === 2) {
		renderChart3New()
		renderChart4New()
	} else if (currentRevenuePage.value === 3) {
		renderChart5New()
		renderChart6New()
	} else if (currentRevenuePage.value === 4) {
		renderChart7New()
	}

	// 自适应调整
	setTimeout(() => {
		chart1Instance?.resize()
		chart2Instance?.resize()
		chart3Instance?.resize()
		chart4Instance?.resize()
		chart3NewInstance?.resize()
		chart4NewInstance?.resize()
		chart5NewInstance?.resize()
		chart6NewInstance?.resize()
		chart7NewInstance?.resize()
	}, 100)
}

// 新增图表渲染函数
function renderChart3New() {
	if (!chart3NewRef.value) return

	if (chart3NewInstance) {
		chart3NewInstance.dispose()
	}
	chart3NewInstance = echarts.init(chart3NewRef.value)

	const option = {
		title: {
			text: 'Annual Sales Situation',
			textStyle: { fontSize: 16, color: '#333', fontWeight: 'bold' },
			top: 10,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('Sales Volume')) {
						result += item.marker + item.seriesName + ': ' + item.value + ' units<br/>'
					} else if (item.seriesName.includes('Sales Revenue') || item.seriesName.includes('Total Revenue')) {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(1) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Product 1 Sales Volume', 'Product 2 Sales Volume', 'Product 1 Sales Revenue', 'Product 2 Sales Revenue', 'Total Revenue'],
			bottom: 5,
			textStyle: { fontSize: 12 },
			itemGap: 15
		},
		grid: {
			left: '8%',
			right: '8%',
			top: '15%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: 18, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Sales Volume (units)',
				position: 'left',
				axisLabel: {
      				formatter: '{value}',
       				fontSize: 14,
        			color: '#666'
       			},
       			axisLine: { lineStyle: { color: '#00d4ff' } },
       			splitLine: { lineStyle: { color: '#f0f0f0' } }
				// show: false,
				// axisLabel: { show: false },
				// axisLine: { show: false },
				// axisTick: { show: false },
				// splitLine: { show: false }
			},
			{
				type: 'value',
				name: 'Sales Revenue (€)',
				position: 'right',
				axisLabel: {
       				formatter: function(value) {
        				return '€' + (value / 1000000).toFixed(0) + 'M'
         			},
           			fontSize: 14,
           			color: '#666'
             	},
          		axisLine: { lineStyle: { color: '#FFC27A' } },
				min: 0,
				max: 210000000,
				// show: false,
				// axisLabel: { show: false },
				// axisLine: { show: false },
				// axisTick: { show: false },
				// splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Product 1 Sales Volume',
				type: 'bar',
				yAxisIndex: 0,
				data: [40, 120, 248],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '15%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: '{c} units',
					offset: [0, -12],
					color: '#333',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Product 2 Sales Volume',
				type: 'bar',
				yAxisIndex: 0,
				data: [60, 180, 371],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '15%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: '{c} units',
					offset: [0, -12],
					color: '#333',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Product 1 Sales Revenue',
				type: 'line',
				yAxisIndex: 1,
				data: [4800000, 14400000, 29714286],
				lineStyle: {
					color: '#FFC27A',
					width: 3
				},
				itemStyle: { color: '#FFC27A' },
				symbol: 'circle',
				symbolSize: 6,
				label: {
					show: true,
					position: 'bottom',
					fontSize: 13,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					offset: [0, 8],
					color: '#FFC27A',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Product 2 Sales Revenue',
				type: 'line',
				yAxisIndex: 1,
				data: [12000000, 36000000, 74285714],
				lineStyle: {
					color: '#FFB6C1',
					width: 3
				},
				itemStyle: { color: '#FFB6C1' },
				symbol: 'diamond',
				symbolSize: 6,
				label: {
					show: true,
					position: 'bottom',
					fontSize: 13,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					offset: [0, 8],
					color: '#FFB6C1',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Total Revenue',
				type: 'line',
				yAxisIndex: 1,
				data: [16800000, 50400000, 104000000],
				lineStyle: {
					color: '#FF6B6B',
					width: 4,
					type: 'dashed'
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 2,
					borderColor: '#fff'
				},
				symbol: 'rect',
				symbolSize: 8,
				label: {
					show: true,
					position: 'top',
					fontSize: 13,
					fontWeight: 'bold',
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					offset: [0, -10],
					color: '#FF6B6B'
				}
			}
		]
	}

	chart3NewInstance.setOption(option)
	setTimeout(() => chart3NewInstance?.resize(), 50)
}

// 创建斜线纹理图案
function createDiagonalPattern(color) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 20
	canvas.height = 20

	// 设置背景色
	ctx.fillStyle = color
	ctx.fillRect(0, 0, 20, 20)

	// 绘制斜线
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
	ctx.lineWidth = 1
	ctx.beginPath()
	for (let i = -20; i <= 40; i += 5) {
		ctx.moveTo(i, 0)
		ctx.lineTo(i + 20, 20)
	}
	ctx.stroke()

	return canvas
}

function renderChart4New() {
	if (!chart4NewRef.value) return

	if (chart4NewInstance) {
		chart4NewInstance.dispose()
	}
	chart4NewInstance = echarts.init(chart4NewRef.value)

	const option = {
		title: {
			text: 'Profit Statement Analysis',
			textStyle: { fontSize: 16, color: '#333', fontWeight: 'bold' },
			top: 10,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('Gross Margin')) {
						result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
					} else if (item.value !== null && item.value !== undefined) {
						result += item.marker + item.seriesName + ': €' + (Math.abs(item.value) / 1000000).toFixed(1) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Total Revenue', 'Cost of Goods Sold', 'Gross Profit', 'Contribution Margin', 'Pre-tax Net Profit', 'Gross Margin Rate'],
			bottom: 5,
			textStyle: { fontSize: 12 },
			itemGap: 12
		},
		grid: {
			left: '8%',
			right: '8%',
			top: '15%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: 12, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Amount (€)',
				position: 'left',
				axisLabel: {
					formatter: function(value) {
						return '€' + (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#00d4ff' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
				// axisLabel: { show: false },
				// axisLine: { show: false },
				// axisTick: { show: false },
				// splitLine: { show: false }
			},
			{
				type: 'value',
				name: 'Gross Margin Rate (%)',
				position: 'right',
				min: 85,
				max: 92,
				axisLabel: {
					formatter: '{value}%',
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
				// axisLabel: { show: false },
				// axisLine: { show: false },
				// axisTick: { show: false },
				// splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Total Revenue',
				type: 'bar',
				stack: 'total',
				yAxisIndex: 0,
				data: [16800000, 50400000, 104000000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '40%',
				label: {
					show: true,
					position: 'top',
					fontSize: 14,
					formatter: function(params) {
						// 计算堆叠总值：Total Revenue + Cost of Goods Sold
						const cogsData = [1910000, 5730000, 11900000]
						const totalValue = params.value + cogsData[params.dataIndex]
						return '€' + (totalValue / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, 10]
				}
			},
			{
				name: 'Cost of Goods Sold',
				type: 'bar',
				stack: 'total',
				yAxisIndex: 0,
				data: [1910000, 5730000, 11900000],
				itemStyle: {
					color: {
						type: 'pattern',
						image: createDiagonalPattern('#0099cc'),
						repeat: 'repeat'
					}
				},
				barWidth: '40%',
				label: {
					show: true,
					position: 'inside',
					fontSize: 12,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#ffffff',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Gross Profit',
				type: 'bar',
				yAxisIndex: 0,
				data: [14890000, 44670000, 92100000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Contribution Margin',
				type: 'bar',
				yAxisIndex: 0,
				data: [11965000, 37155000, 79250000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#FFC107' },
						{ offset: 0.5, color: '#F57F17' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Pre-tax Net Profit',
				type: 'line',
				yAxisIndex: 0,
				data: [11173333, 36238333, 78208334],
				lineStyle: {
					color: '#2196F3',
					width: 4
				},
				itemStyle: {
					color: '#2196F3',
					borderWidth: 3,
					borderColor: '#fff'
				},
				symbol: 'circle',
				symbolSize: 8,
				label: {
					show: true,
					position: 'bottom',
					fontSize: 13,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#2196F3',
					fontWeight: 'bold',
					offset: [0, 12]
				}
			},
			{
				name: 'Gross Margin Rate',
				type: 'line',
				yAxisIndex: 1,
				data: [88.6, 88.6, 88.6],
				lineStyle: {
					color: '#FF6B6B',
					width: 3,
					type: 'dashed'
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 2,
					borderColor: '#fff'
				},
				symbol: 'diamond',
				symbolSize: 6,
				label: {
					show: true,
					position: 'bottom',
					fontSize: 13,
					formatter: '{c}%',
					color: '#FF6B6B',
					fontWeight: 'bold',
					offset: [0, 8]
				}
			}
		]
	}

	chart4NewInstance.setOption(option)
	setTimeout(() => chart4NewInstance?.resize(), 50)
}

function renderChart5New() {
	if (!chart5NewRef.value) return

	if (chart5NewInstance) {
		chart5NewInstance.dispose()
	}
	chart5NewInstance = echarts.init(chart5NewRef.value)

	const option = {
		title: {
			text: 'Investment Return Analysis',
			subtext: 'Based on €5M Total Investment',
			textStyle: { fontSize: 16, color: '#333', fontWeight: 'bold' },
			subtextStyle: { fontSize: 12, color: '#666' },
			top: 10,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('ROI')) {
						result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
					} else {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(1) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Annual Net Profit', 'Cumulative Net Profit', 'Annual ROI', 'Cumulative ROI'],
			bottom: '5%',
			textStyle: { fontSize: 12 },
			itemGap: 15
		},
		grid: {
			left: '8%',
			right: '8%',
			top: '15%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: 18, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Net Profit (€)',
				position: 'left',
				axisLabel: {
					formatter: function(value) {
						return '€' + (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#00d4ff' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
				// axisLabel: { show: false },
				// axisLine: { show: false },
				// axisTick: { show: false },
				// splitLine: { show: false }
			},
			{
				type: 'value',
				name: 'ROI (%)',
				position: 'right',
				min: 200,
				max: 4600,
				axisLabel: {
					formatter: '{value}%',
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
				// axisLabel: { show: false },
				// axisLine: { show: false },
				// axisTick: { show: false },
				// splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Annual Net Profit',
				type: 'bar',
				yAxisIndex: 0,
				data: [11173333, 36238333, 78208334],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 0.5, color: '#0099cc' },
						{ offset: 1, color: '#006699' }
					])
				},
				barWidth: '25%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Cumulative Net Profit',
				type: 'bar',
				yAxisIndex: 0,
				data: [11173333, 47411666, 125620000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#66b3ff' },
						{ offset: 0.5, color: '#3399ff' },
						{ offset: 1, color: '#0080ff' }
					])
				},
				barWidth: '25%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Annual ROI',
				type: 'line',
				yAxisIndex: 1,
				data: [223.5, 724.8, 1564.2],
				lineStyle: {
					color: '#FF6B6B',
					width: 4
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 3,
					borderColor: '#fff'
				},
				symbol: 'circle',
				symbolSize: 8,
				label: {
					show: true,
					position: 'top',
					fontSize: 13,
					formatter: '{c}%',
					color: '#FF6B6B',
					fontWeight: 'bold',
					offset: [0, -15]
				}
			},
			{
				name: 'Cumulative ROI',
				type: 'line',
				yAxisIndex: 1,
				data: [223.5, 948.2, 2512.4],
				lineStyle: {
					color: '#FFC107',
					width: 4,
					type: 'dashed'
				},
				itemStyle: {
					color: '#FFC107',
					borderWidth: 3,
					borderColor: '#fff'
				},
				symbol: 'diamond',
				symbolSize: 8,
				label: {
					show: true,
					position: 'top',
					fontSize: 13,
					formatter: '{c}%',
					color: '#FFC107',
					fontWeight: 'bold',
					offset: [0, -15]
				}
			}
		],
		graphic: {
			type: 'text',
			left: 'center',
			bottom: '1%',
			style: {
				text: 'Investment Amount: €5M | Cumulative Return Over Three Years: €125.6M | Total Return Rate: 2512.4%',
				fontSize: 12,
				fontWeight: 'bold',
				color: '#666',
				backgroundColor: '#f8f9fa',
				padding: [8, 16],
				borderRadius: 8
			}
		}
	}

	chart5NewInstance.setOption(option)
	setTimeout(() => chart5NewInstance?.resize(), 50)
}

function renderChart6New() {
	if (!chart6NewRef.value) return

	if (chart6NewInstance) {
		chart6NewInstance.dispose()
	}
	chart6NewInstance = echarts.init(chart6NewRef.value)

	const option = {
		title: {
			text: 'Cash Flow Analysis',
			textStyle: { fontSize: 16, color: '#333', fontWeight: 'bold' },
			top: 10,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesType === 'line') {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(2) + 'M<br/>'
					} else {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(2) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Pre-tax Net Profit', 'Non-cash Amortization', 'Operating Cash Flow', 'Cumulative Cash Flow'],
			bottom: 5,
			textStyle: { fontSize: 12 },
			itemGap: 10
		},
		grid: {
			left: '8%',
			right: '8%',
			top: '15%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: 18, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Cash Flow (€)',
				position: 'left',
				min: 0,
				max: 90000000,
				axisLabel: {
					formatter: function(value) {
						return (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#4CAF50' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'Cumulative (€)',
				position: 'right',
				min: 0,
				max: 140000000,
				axisLabel: {
					formatter: function(value) {
						return (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Pre-tax Net Profit',
				type: 'bar',
				yAxisIndex: 0,
				data: [11173333, 36238333, 78208334],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#2E7D32' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Non-cash Amortization',
				type: 'bar',
				yAxisIndex: 0,
				data: [291667, 291667, 291666],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#FF9800' },
						{ offset: 1, color: '#F57C00' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000).toFixed(0) + 'K'
					},
					color: '#000000',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Operating Cash Flow',
				type: 'bar',
				yAxisIndex: 0,
				data: [11465000, 36530000, 78500000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2196F3' },
						{ offset: 1, color: '#1565C0' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					fontWeight: 'bold'
				}
			},
			{
				name: 'Cumulative Cash Flow',
				type: 'line',
				yAxisIndex: 1,
				data: [11465000, 47995000, 126495000],
				itemStyle: {
					color: '#FF6B6B'
				},
				lineStyle: {
					width: 3,
					color: '#FF6B6B'
				},
				symbol: 'circle',
				symbolSize: 8,
				label: {
					show: true,
					position: 'top',
					fontSize: 14,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#FF6B6B',
					fontWeight: 'bold',
					offset: [0, -10]
				}
			}
		]
	}

	chart6NewInstance.setOption(option)
	setTimeout(() => chart6NewInstance?.resize(), 50)
}

function renderChart7New() {
	if (!chart7NewRef.value) return

	if (chart7NewInstance) {
		chart7NewInstance.dispose()
	}
	chart7NewInstance = echarts.init(chart7NewRef.value)

	const option = {
		title: {
			text: 'Key Performance Indicators',
			textStyle: { fontSize: 16, color: '#333', fontWeight: 'bold' },
			top: 10,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('ROI') && item.value > 100) {
						result += item.marker + item.seriesName + ': ' + item.value.toFixed(1) + '%<br/>'
					} else if (item.value !== null && item.value !== undefined) {
						result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Gross Margin', 'Contribution Margin', 'Net Profit Margin', 'Annual ROI'],
			bottom: 5,
			textStyle: { fontSize: 12 },
			itemGap: 15
		},
		grid: {
			left: '8%',
			right: '8%',
			top: '15%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: 18, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Profit Margin (%)',
				position: 'left',
				min: 0,
				max: 100,
				axisLabel: {
					formatter: '{value}%',
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#00d4ff' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'ROI (%)',
				position: 'right',
				min: 0,
				max: 1800,
				axisLabel: {
					formatter: '{value}%',
					fontSize: 14,
					color: '#666'
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Gross Margin',
				type: 'bar',
				yAxisIndex: 0,
				data: [88.6, 88.6, 88.6],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '15%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: '{c}%',
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Contribution Margin',
				type: 'bar',
				yAxisIndex: 0,
				data: [71.2, 73.7, 76.2],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#66b3ff' },
						{ offset: 1, color: '#3399ff' }
					])
				},
				barWidth: '15%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: '{c}%',
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Net Profit Margin',
				type: 'bar',
				yAxisIndex: 0,
				data: [66.5, 71.9, 75.2],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#99ccff' },
						{ offset: 1, color: '#66b3ff' }
					])
				},
				barWidth: '15%',
				label: {
					show: true,
					position: 'top',
					fontSize: 18,
					formatter: '{c}%',
					color: '#000000',
					fontWeight: 'bold',
					offset: [0, -8]
				}
			},
			{
				name: 'Annual ROI',
				type: 'line',
				yAxisIndex: 1,
				data: [223.5, 724.8, 1564.2],
				lineStyle: {
					color: '#FF6B6B',
					width: 5,
					type: 'solid'
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 4,
					borderColor: '#fff'
				},
				symbol: 'circle',
				symbolSize: 10,
				label: {
					show: true,
					position: 'bottom',
					fontSize: 13,
					formatter: '{c}%',
					color: '#FF6B6B',
					fontWeight: 'bold',
					offset: [0, -45]
				}
			}
		],
	}

	chart7NewInstance.setOption(option)
	setTimeout(() => chart7NewInstance?.resize(), 50)
}

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
							fontSize: 8,
							// fontWeight: 'bold',
							color: '#ffffff',
							lineHeight: 12
						},
						labelLine: {
							show: true,
							length: 10,
							length2: 5,
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
							fontSize: 8,
							// fontWeight: 'bold',
							color: '#ffffff',
							lineHeight: 12
						},
						labelLine: {
							show: true,
							length: 10,
							length2: 5,
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
				}
			}, 100)
		})
	}
})

function onWindowResize() {
	// 使用防抖来优化性能，避免频繁重绘
	clearTimeout(window.resizeTimer)
	window.resizeTimer = setTimeout(() => {
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
		// 重新渲染模态框图表（包含Chart 1-4）以应用新的响应式字体大小
		if (activeContent.value === 'revenue' && (chart1Instance || chart2Instance || chart3Instance || chart4Instance)) {
			renderModalCharts()
		}
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
	if (chart1Instance) {
		chart1Instance.dispose()
		chart1Instance = null
	}
	if (chart2Instance) {
		chart2Instance.dispose()
		chart2Instance = null
	}
	if (chart3Instance) {
		chart3Instance.dispose()
		chart3Instance = null
	}
	if (chart4Instance) {
		chart4Instance.dispose()
		chart4Instance = null
	}
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
	background: linear-gradient(
		180deg,
		transparent 0%,
		rgba(255, 255, 255, 0.1) 10%,
		rgba(255, 255, 255, 0.2) 50%,
		rgba(255, 255, 255, 0.1) 90%,
		transparent 100%
	);
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

/* B方块样式 - 左上角 */
/* 删除不再需要的 block-b 和 block-c 样式 */

/* 删除不再需要的方块响应式样式 */


/* C方块内容面板 - 全屏 */
.c-content-panel {
	margin-top: 71px;
	width: 100%;
	height: calc(100% - 71px);
	/*  background-image: url('../assets/c_clinet_bg.png');
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat; */
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
	background: url('../assets/bs_bg.png') center/contain;
	background-color: #000000;
	position: absolute;
	top: 0;
	left: 0;
	animation: fadeInScale 0.5s ease-out;
	overflow: hidden;
}

.b-content-panel .main-content {
	height: calc(100vh - 80px);
	max-height: calc(100vh - 80px);
	padding-top: 80px;
	padding-left: 150px;
	padding-right: 10px;
}

/* 响应式布局 - 修复比例问题 */
@media (max-width: 1920px) {
	.b-content-panel .main-content {
		padding-left: 100px;
		padding-right: 20px;
	}
	
	.b-content-panel .left-panel {
		width: 480px !important;
		min-width: 480px !important;
		max-width: 480px !important;
	}
	
	.b-content-panel .content-panel {
		width: 540px !important;
	}
}

@media (max-width: 1600px) {
	.b-content-panel .main-content {
		padding-left: 60px;
		padding-right: 20px;
		gap: 12px;
	}
	
	.b-content-panel .left-panel {
		width: 420px !important;
		min-width: 420px !important;
		max-width: 420px !important;
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
		padding-right: 15px;
		gap: 10px;
	}
	
	.b-content-panel .left-panel {
		width: 380px !important;
		min-width: 380px !important;
		max-width: 380px !important;
		padding: 12px;
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
	background:#ffffff;
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
	background:#ffffff;
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
	height: calc(100vh - 80px);
	max-height: calc(100vh - 80px);
	padding-top: 80px;
	gap: 15px;
	overflow: hidden;
	padding-left: 150px;
	padding-right: 10px;
}

/* 响应式布局 - 主内容区域 */
@media (max-width: 1920px) {
	.main-content {
		padding-left: 100px;
		padding-right: 20px;
	}
}

@media (max-width: 1600px) {
	.main-content {
		padding-left: 60px;
		padding-right: 20px;
		gap: 12px;
	}
}

@media (max-width: 1366px) {
	.main-content {
		padding-left: 40px;
		padding-right: 15px;
		gap: 10px;
	}
}

@media (max-width: 1024px) {
	.main-content {
		padding-left: 20px;
		padding-right: 15px;
		flex-direction: column;
		overflow-y: auto;
	}
}

/* 左侧面板：Revenue Model + Channel Strategy */
.left-panel {
	flex: 0 0 416px;
	min-width: 416px;
	max-width: 416px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	overflow: hidden;
	height: calc(100vh - 80px);
}

/* 响应式布局 - 左侧面板 */
@media (max-width: 1920px) {
	.left-panel {
		flex: 0 0 480px;
		min-width: 480px;
		max-width: 480px;
	}
}

@media (max-width: 1600px) {
	.left-panel {
		flex: 0 0 420px;
		min-width: 420px;
		max-width: 420px;
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
	flex: 0 0 280px;
	min-width: 280px;
	max-width: 320px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
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
	overflow-y: auto;
	max-height: calc(100vh - 280px);
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
	height: 160px;
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
	width: 120%;
	height: 120px;
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
	/* padding: 10px 0; */
	/* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
}

.legend-item:last-child {
	border-bottom: none;
}

.legend-label {
	color: #cccccc;
}

.legend-value {
	font-weight: 600;
	color: #00d4ff;
}


/* Revenue Modal 样式 */
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
	padding: 106px 140px;
	box-sizing: border-box;
}

.revenue-modal-content {
	/* background: rgba(255, 255, 255, 0.1); */
	/* background-color: #ffffff; */
	background-color: #f1efef;
	backdrop-filter: blur(25px) saturate(180%);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 20px;
	width: 100%;
	height: 100%;
	padding: 0;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3),
		0 0 0 1px rgba(255, 255, 255, 0.1) inset;
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

.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	background: rgba(0, 0, 0, 0.05);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.6);
	cursor: pointer;
	padding: 0;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
	text-shadow: none;
	z-index: 10;
	font-size: 24px;
}

.close-btn:hover {
	background: rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.8);
	transform: scale(1.1);
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
</style>
