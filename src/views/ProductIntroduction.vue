<template>
	<div class="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative">
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

				<div class="nav-item active">Product Introduction</div>
				<div class="nav-divider"></div>
				<router-link to="/industry-background" class="nav-item">Industry Background</router-link>
				<div class="nav-divider"></div>
				<router-link to="/market-demand" class="nav-item">Market Demand</router-link>
				<div class="nav-divider"></div>
				<router-link to="/business-model" class="nav-item">Business Model</router-link>
				<div class="nav-divider"></div>
				<router-link to="/team-composition" class="nav-item">Team Composition</router-link>
			</div>
		</nav>

		<!-- 背景视频 -->
		<video class="absolute inset-0 w-full h-full object-cover" src="../assets/video/video-1.mp4" autoplay muted loop
			playsinline></video>

		<!-- 左侧悬浮按钮 -->
		<div class="left-nav-toggle-btn" @click="toggleNavMenu">
			<svg v-if="!isNavMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
			<svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
				stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>

		<!-- 左侧导航菜单 -->
		<div class="left-section" :class="{ 'left-section-open': isNavMenuOpen }">
			<div class="absolute left-5 sm:left-10 md:left-12 lg:left-14 xl:left-16 2xl:left-20 top-[calc(84px+30px)] bottom-[30px] bg-[rgba(100,100,100,0.3)] backdrop-blur-[20px] border border-white/30 rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] min-w-[200px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[270px] xl:min-w-[280px] z-[10000] flex flex-col box-border overflow-y-auto overflow-x-hidden custom-scrollbar" ref="leftNavWrapperRef">
				<div class="left-nav-list" ref="navListRef">
					<div class="left-nav-item" ref="firstNavItemRef" :class="{ active: activeNavItem === 'advantages' }"
						@click="setActiveNavItem('advantages')">
						<span class="nav-text">Hydrofoil Advantages</span>
					</div>
					<div class="left-nav-item" :class="{ active: activeNavItem === 'pain-points' }"
						@click="setActiveNavItem('pain-points')">
						<span class="nav-text">Traditional Electric Boat Pain Points</span>
					</div>
					<div class="left-nav-item" ref="lastNavItemRef"
						:class="{ active: activeNavItem === 'competitor-analysis' }"
						@click="setActiveNavItem('competitor-analysis')">
						<span class="nav-text">Competitor Analysis</span>
					</div>
					<div class="left-nav-item" ref="lastNavItemRef" :class="{ active: activeNavItem === 'three-mode-rudder' }"
						@click="setActiveNavItem('three-mode-rudder')">
						<span class="nav-text">Intelligent control three-mode rudder</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 传统电动船舶痛点弹窗 -->
		<div v-if="activeNavItem === 'pain-points'" class="modal-overlay" @click="closePainPointsModal">
			<div class="market-research-modal" @click.stop>
				<!-- 背景图片 -->
				<img src="../assets/electron_vs.png" alt="Traditional Electric Boat Pain Points"
					class="pain-points-background" />
				<!-- 关闭按钮 -->


				<!-- 弹窗标题 -->
				<div class="modal-title flex justify-between">Traditional Electric Boat Pain Points
					<button class="modal-close-btn" @click="closePainPointsModal">×</button>
				</div>

				<!-- 弹窗内容 -->
				<div class="modal-content-wrapper pain-points-content-wrapper">
					<!-- 左侧面板：图表和数据可视化 -->
					<div class="modal-left-panel pain-points-left-panel">
						<!-- 左侧内容显示背景图片和图表 -->
					</div>

					<!-- 右侧内容区域 -->
					<div class="modal-right-panel pain-points-right-panel"
						:class="{ 'pain-points-right-panel-expanded': showPainPointsContent }">
						<!-- 如果未展开，显示可点击的div -->
						<div v-if="!showPainPointsContent" class="pain-points-trigger-btn-inner"
							@click="showPainPointsContent = true">
							Traditional Electric Boat Pain Points
						</div>

						<!-- 如果已展开，显示实际内容 -->
						<template v-else>
							<div class="panel-header-section">
								<div class="panel-header">Traditional Electric Boat Pain Points</div>
								<button class="pain-points-close-btn" @click="showPainPointsContent = false"
									title="Close">×</button>
							</div>
							<!-- 内容 -->
							<div class="panel-content">
								<div class="panel-content-inner">
									<!-- 结论部分 -->
									<div class="panel-section">
										<div class="conclusion-title">Conclusion:</div>
										<div class="conclusion-content">
											<div class="conclusion-item">
												<span class="conclusion-number">1.</span>
												<span class="conclusion-text">Weight & Resistance: Electric boats have
													higher values due to battery pack weight and hull design;</span>
											</div>
											<div class="conclusion-item">
												<span class="conclusion-number">2.</span>
												<span class="conclusion-text">Size Requirements: To compensate for
													energy density disadvantages, electric boats need larger hulls to
													accommodate more batteries or optimize hydrodynamic
													performance.</span>
											</div>
										</div>
									</div>

									<!-- 解决办法 -->
									<div class="panel-section">
										<div class="solutions-title">Solutions:</div>
										<div class="solutions-grid">
											<div class="solution-item">■ Controllable Cost</div>
											<div class="solution-item">■ High Efficiency & Energy Saving</div>
											<div class="solution-item">■ Quick Profitability</div>
											<div class="solution-item">■ Policy Avoidance</div>
										</div>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>

		<!-- 竞品分析弹窗 -->
		<div v-if="activeNavItem === 'competitor-analysis'" class="modal-overlay" @click="closeCompetitorAnalysisModal">
			<div class="market-research-modal" @click.stop>
				<!-- 弹窗标题 -->
				<div class="modal-title flex justify-between">Competitor Analysis
					<button class="modal-close-btn" @click="closeCompetitorAnalysisModal">×</button>
				</div>

				<!-- 弹窗内容 -->
				<div class="modal-content-wrapper competitor-analysis-wrapper">
					<!-- Tab切换 -->
					<div class="competitor-tabs">
						<button class="competitor-tab text-sm sm:text-base md:text-lg lg:text-xl" :class="{ active: competitorTab === '10-15w' }"
							@click="setCompetitorTab('10-15w')">
							<!-- Hydrofoil 10-15w Euro -->
							YU VS (€100,000 - €150,000) Electric Yacht
						</button>
						<button class="competitor-tab text-sm sm:text-base md:text-lg lg:text-xl" :class="{ active: competitorTab === '18w' }"
							@click="setCompetitorTab('18w')">
							<!-- Hydrofoil 18w Euro -->
							YU VS (€180,000) Electric Yacht
						</button>
						<button class="competitor-tab text-sm sm:text-base md:text-lg lg:text-xl" :class="{ active: competitorTab === 'vs-others' }"
							@click="setCompetitorTab('vs-others')">
							<!-- VS Other Hydrofoils -->
							YU VS Other Electric Hydrofoils
						</button>
					</div>

					<!-- Tab内容 -->
					<div class="competitor-tab-content">
						<!-- 水翼艇10-15w欧元 -->
						<div v-if="competitorTab === '10-15w'" class="tab-panel three-col-tab">
							<!-- 产品图片 -->
							<div class="competitor-grid">
								<!-- 空白占位符 -->
								<div class="competitor-spacer"></div>

								<!-- "御"水翼艇 -->
								<div class="competitor-item yu-column">
									<div class="competitor-image-wrapper">
										<video src="../assets/boat.mp4" alt="御水翼艇" class="competitor-image" autoplay loop muted playsinline></video>
									</div>
								</div>

								<!-- Alfastreet 23 Cabin EVO Electric -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/bb1.png" alt="Alfastreet 23 Cabin EVO Electric"
											class="competitor-image" />
									</div>
								</div>

								<!-- X-Shore 1 -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/bb2.png" alt="X-Shore 1" class="competitor-image" />
									</div>
								</div>
							</div>

							<!-- 性能对比表格 -->
							<div class="comparison-table-wrapper">
								<table class="comparison-table text-base sm:text-lg md:text-xl lg:text-xl">
									<tbody>
										<tr>
											<td>Maximum Speed (km/h)</td>
											<td class="yu-column">65</td>
											<td>33</td>
											<td>55</td>
										</tr>
										<tr>
											<td>Range at Full Speed (km)</td>
											<td class="yu-column">65</td>
											<td>30</td>
											<td>33</td>
										</tr>
										<tr>
											<td>Power-to-Speed Ratio (kw/kn)</td>
											<td class="yu-column">1:1</td>
											<td>2:1</td>
											<td>6:1</td>
										</tr>
										<tr>
											<td>Battery Weight</td>
											<td class="yu-column">Approximately 220kg</td>
											<td>Approximately 300kg</td>
											<td>Approximately 500kg</td>
										</tr>
										<tr>
											<td>Motor Power</td>
											<td class="yu-column">>20kw</td>
											<td>30kw</td>
											<td>120kw</td>
										</tr>
										<tr>
											<td>Max Occupancy</td>
											<td class="yu-column">5</td>
											<td>8</td>
											<td>5</td>
										</tr>
										<tr>
											<td>Price (New Boat)</td>
											<td class="yu-column">€150,000</td>
											<td>€134,800</td>
											<td>€100,000 ~ €155,900 (excluding VAT) </td>
										</tr>
										<tr>
											<td>Comfort</td>
											<td class="yu-column">
												<div class="stars">★★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
										</tr>
										<tr>
											<td>Battery Capacity</td>
											<td class="yu-column">40kwh</td>
											<td>30kwh</td>
											<td>63kwh</td>
										</tr>
										<tr>
											<td>Exterior Design</td>
											<td class="yu-column">
												<div class="stars">★★★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★</div>
											</td>
										</tr>
										<tr>
											<td>Functionality / Intelligence</td>
											<td class="yu-column">
												<div class="stars">★★★★★</div>
											</td>
											<td>
												<div class="stars">★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<!-- 水翼艇18w欧元 -->
						<div v-if="competitorTab === '18w'" class="tab-panel four-col-tab">
							<!-- 产品图片 -->
							<div class="competitor-grid">
								<!-- 空白占位符 -->
								<div class="competitor-spacer"></div>

								<!-- "御"水翼艇 -->
								<div class="competitor-item yu-column">
									<div class="competitor-image-wrapper">
										<video src="../assets/boat.mp4" alt="御水翼艇" class="competitor-image" autoplay loop muted playsinline></video>
									</div>
								</div>

								<!-- Q-Yachts Q30 -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/bbc1.png" alt="Q-Yachts Q30" class="competitor-image" />
									</div>
								</div>

								<!-- RAND Spirit 25 Electric -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/bbc2.png" alt="RAND Spirit 25 Electric"
											class="competitor-image" />
									</div>
								</div>

								<!-- Frauscher 740 Mirage Air -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/bbc3.png" alt="Frauscher 740 Mirage Air"
											class="competitor-image" />
									</div>
								</div>
							</div>

							<!-- 性能对比表格 -->
							<div class="comparison-table-wrapper">
								<table class="comparison-table text-base sm:text-lg md:text-xl lg:text-xl">
									<tbody>
										<tr>
											<td>Maximum Speed (km/h)</td>
											<td class="yu-column">65</td>
											<td>25.9</td>
											<td>51</td>
											<td>26</td>
										</tr>
										<tr>
											<td>Range at Full Speed (km)</td>
											<td class="yu-column">65</td>
											<td>38.85</td>
											<td>23</td>
											<td>19</td>
										</tr>
										<tr>
											<td>Power-to-Speed Ratio (kw/kn)</td>
											<td class="yu-column">1:1</td>
											<td>2:1</td>
											<td>3:1</td>
											<td>2:1</td>
										</tr>
										<tr>
											<td>Battery Weight</td>
											<td class="yu-column">Approximately 220kg</td>
											<td>Approximately 240kg</td>
											<td>Approximately 625kg</td>
											<td>Approximately 320kg</td>
										</tr>
										<tr>
											<td>Motor Power</td>
											<td class="yu-column">>20kw</td>
											<td>2*10kw</td>
											<td>170kw</td>
											<td>60kw</td>
										</tr>
										<tr>
											<td>Max Occupancy</td>
											<td class="yu-column">5</td>
											<td>8</td>
											<td>6</td>
											<td>7</td>
										</tr>
										<tr>
											<td>Price (New Boat)</td>
											<td class="yu-column">€150,000</td>
											<td>€183,000</td>
											<td>€185,000 from</td>
											<td>€232,720 from (excl. VAT)</td>
										</tr>
										<tr>
											<td>Comfort</td>
											<td class="yu-column">
												<div class="stars">★★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
										</tr>
										<tr>
											<td>Battery Capacity</td>
											<td class="yu-column">40kwh</td>
											<td>30kwh</td>
											<td>63 kWh Lithium Battery</td>
											<td>40kWh</td>
										</tr>
										<tr>
											<td>Exterior Design</td>
											<td class="yu-column">
												<div class="stars">★★★★★</div>
											</td>
											<td>
												<div class="stars">★★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★★★</div>
											</td>
										</tr>
										<tr>
											<td>Functionality / Intelligence</td>
											<td class="yu-column">
												<div class="stars">★★★★★</div>
											</td>
											<td>
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★</div>
											</td>
											<td>
												<div class="stars">★★★★</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<!-- VS 其他水翼艇 -->
						<div v-if="competitorTab === 'vs-others'" class="tab-panel vs-others-tab">
							<!-- <div class="competitor-title">5米级水翼艇颠覆性重构小艇性能天花板</div> -->
							<div class="competitor-grid">
								<!-- 空白占位符，与表格第一列对齐 -->
								<div class="competitor-spacer"></div>

								<!-- 我们的产品 -->
								<div class="competitor-item yu-column">
									<div class="competitor-image-wrapper">
										<video src="../assets/boat.mp4" alt="御水翼艇" class="competitor-image" autoplay loop muted playsinline></video>
									</div>
								</div>

								<!-- 友商A -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/other1.png" alt="友商A" class="competitor-image" />
									</div>
								</div>

								<!-- 友商B -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/other2.png" alt="友商B" class="competitor-image" />
									</div>
								</div>

								<!-- 友商C -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/other3.png" alt="友商C" class="competitor-image" />
									</div>
								</div>

								<!-- 友商D -->
								<div class="competitor-item">
									<div class="competitor-image-wrapper">
										<img src="../assets/other4.png" alt="友商D" class="competitor-image" />
									</div>
								</div>
							</div>

							<!-- 性能对比表格 -->
							<div class="comparison-table-wrapper">
								<table class="comparison-table text-base sm:text-lg md:text-xl lg:text-xl">
									<tbody>
										<tr>
											<td>Maximum Speed (km/h)</td>
											<td class="yu-column">65</td>
											<td>24</td>
											<td>28</td>
											<td>80</td>
											<td>55</td>
											<!-- <td>26KM/H</td> -->
										</tr>
										<tr>
											<td>Range at Full Speed (km)</td>
											<td class="yu-column">65</td>
											<td>80</td>
											<td>50</td>
											<td>100</td>
											<td>100</td>
											<!-- <td>19</td> -->
										</tr>
										<tr>
											<td>Power-to-Speed Ratio (kW / kn)</td>
											<td class="yu-column">1:1</td>
											<td>2:1</td>
											<td>2:1</td>
											<td>2:1</td>
											<td>2:1</td>
										</tr>
										<tr>
											<td>Cost-effectiveness</td>
											<!-- <td>€35,000</td> -->
											<td class="yu-column">€150,000</td>
											<td>€35，700</td>
											<td>€196，800</td>
											<td>€700，000</td>
											<td>€513，800</td>
										</tr>
										<tr>
											<td>Battery Weight</td>
											<td class="yu-column">Approximately 220kg</td>
											<td>Approximately 100kg</td>
											<td>Approximately 360kg</td>
											<td>Approximately 780kg</td>
											<td>Approximately 1850kg</td>
											<!-- <td>~320kg</td> -->
										</tr>
										<!-- <tr>
											<td>Motor Power</td>
											<td>40kw</td>
											<td>30kw</td>
											<td>120kw</td>
											<td>2*10kw</td>
											<td>170kw</td>
										</tr> -->
										<tr>
											<td>Maximum occupant capacity</td>
											<td class="yu-column">4</td>
											<td>2</td>
											<td>4</td>
											<td>6</td>
											<td>8</td>
											<!-- <td>7</td> -->
										</tr>
										<!-- <tr>
											<td>Price (New Boat) (€)</td>
											<td>€150,000</td>
											<td>€134,800</td>
											<td>€100,000 ~€155,900</td>
											<td>€183,000</td>
											<td>€185,000 from</td>
										</tr> -->
										<tr>
											<td>Human-Computer Interaction Usability</td>
											<td class="yu-column">
												<!-- 4星 -->
												<div class="stars">★★★★</div>
											</td>
											<td>
												<!-- 3.星 -->
												<div class="stars">★★★</div>
											</td>
											<td>
												<!-- 3.星  -->
												<div class="stars">★★★</div>
											</td>
											<td>
												<div class="stars">★★★★</div>
											</td>
											<td>
												<div class="stars">★★</div>
											</td>
											<!-- <td>
												<div class="stars">★★</div>
											</td> -->
										</tr>
									</tbody>
								</table>
							</div>

							<!-- 结论部分 -->
							<div class="competitor-conclusion">
								<div class="conclusion-title text-base sm:text-lg md:text-xl lg:text-2xl">Conclusion:</div>
								<div class="conclusion-content">
									<div class="conclusion-item text-sm sm:text-base md:text-lg">
										<span class="conclusion-bullet">•</span>
										<span class="conclusion-text">Compared to traditional electric boats in the
											100,000 Euro
											range, the "YU" hydrofoil has leading advantages in core performance and
											sailing
											experience;</span>
									</div>
									<div class="conclusion-item text-sm sm:text-base md:text-lg">
										<span class="conclusion-bullet">•</span>
										<span class="conclusion-text">In terms of energy efficiency, quietness, and
											comfort, it
											has reached the level of products in the 170,000 Euro range;</span>
									</div>
									<div class="conclusion-item text-sm sm:text-base md:text-lg">
										<span class="conclusion-bullet">•</span>
										<span class="conclusion-text">Compared to other electric yachts on the market
											that also
											use hydrofoil technology, it highlights its more competitive price while
											maintaining
											core performance comparable to more expensive models.</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 智能控制三模方向舵弹窗 -->
		<div v-if="activeNavItem === 'three-mode-rudder'" class="fixed inset-0 w-screen h-screen bg-[rgba(40,40,40,0.6)] backdrop-blur-[20px] z-[20000] flex items-center justify-center p-0 m-0 overflow-hidden" @click="closeThreeModeRudderModal">
			<div class="relative w-full h-full max-w-full max-h-screen bg-[rgba(40,40,40,0.95)] backdrop-blur-[20px] rounded-none border-none shadow-none overflow-y-auto overflow-x-hidden m-0 p-0 flex flex-col" @click.stop>
				<!-- 关闭按钮 -->
				<button class="modal-close-btn" @click="closeThreeModeRudderModal">×</button>

				<!-- 弹窗标题 -->
				<div class="modal-title">Intelligent control three-mode rudder</div>

				<!-- 弹窗内容 -->
				<div class="modal-content-wrapper three-mode-rudder-wrapper">
					<!-- 左侧：方向盘详细展示 -->
					<div class="three-mode-left-panel">
						<div class="steering-wheel-container">
							<!-- 方向盘图片 -->
							<div class="steering-wheel-image-wrapper">
								<img src="../assets/driver.gif" alt="Intelligent control three-mode rudder" class="steering-wheel-image" />
							</div>
						</div>
					</div>

					<!-- 右侧：驾驶模式和车内视图 -->
					<div class="three-mode-right-panel">
						<!-- 驾驶模式指示器 -->
						<div class="driving-mode-box">
							<div class="driving-mode-title">DRIVING MODE</div>
							<div class="driving-mode-subtitle" v-if="drivingMode === 'normal'">FULL DRIVER CONTROL</div>
							<div class="driving-mode-subtitle" v-else-if="drivingMode === 'sport'">REMOVE SPEED LIMIT</div>
							<div class="driving-mode-subtitle" v-else>FULL-AUTOMATIC</div>
							<div class="driving-mode-subtitle" v-if="drivingMode === 'automatic'" style="margin-top: 4px; font-size: 12px;">ROUTE PLANNING</div>
						</div>

						<!-- 车内视图 - 点击切换模式 -->
						<div class="interior-view-wrapper" @click="toggleDrivingMode">
							<img v-if="drivingMode === 'normal'" src="../assets/driver1.png" alt="Car interior view - Normal mode" class="interior-view-image cursor-pointer" />
							<img v-else-if="drivingMode === 'sport'" src="../assets/driver2.png" alt="Car interior view - Sport mode" class="interior-view-image cursor-pointer" />
							<img v-else src="../assets/driver3.png" alt="Car interior view - Automatic mode" class="interior-view-image cursor-pointer" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 水翼艇优势弹窗 -->
		<div v-if="activeNavItem === 'advantages'" class="modal-overlay" @click="closeAdvantagesModal">
			<div class="market-research-modal" @click.stop>
				<!-- 关闭按钮 -->
				<button class="modal-close-btn" @click="closeAdvantagesModal">×</button>

				<!-- 弹窗标题 -->
				<div class="modal-title">Hydrofoil Advantages</div>

				<!-- 弹窗内容 -->
				<div class="modal-content-wrapper">
					<!-- 左侧面板：水翼艇优势 -->
					<div class="modal-left-panel">
						<div class="panel-header">Hydrofoil Advantages</div>

						<!-- 第一部分：什么是水翼船 -->
						<div class="panel-section">
							<div class="section-title">1. What is a Hydrofoil?</div>
							<div class="section-text">
								A hydrofoil is a boat-like "seaplane" vessel. When accelerating, the hydrofoils beneath
								the hull
								generate lift, lifting the entire hull out of the water, with only slender hydrofoil
								struts
								touching the water. This design significantly reduces water resistance and dramatically
								improves
								sailing speed and efficiency.
							</div>
						</div>

						<!-- 第二部分：性能对比 -->
						<div class="panel-section">
							<div class="section-title">2. How does the hydrofoil perform compared to traditional boats?
							</div>
							<div class="performance-list">
								<div class="performance-item">
									<div class="performance-label">Drag reduction: up to 80%</div>
									<div class="performance-bar">
										<div class="performance-bar-fill red-bar" style="width: 100%"></div>
									</div>
								</div>
								<div class="performance-item">
									<div class="performance-label">Stability improvement: 30%-70%</div>
									<div class="performance-bar">
										<div class="performance-bar-fill orange-bar" style="width: 70%"></div>
									</div>
								</div>
								<div class="performance-item">
									<div class="performance-label">Speed increase: 30%-50%</div>
									<div class="performance-bar">
										<div class="performance-bar-fill orange-bar" style="width: 50%"></div>
									</div>
								</div>
								<div class="performance-item">
									<div class="performance-label">Energy consumption reduction: 30%-50%</div>
									<div class="performance-bar">
										<div class="performance-bar-fill orange-bar" style="width: 50%"></div>
									</div>
								</div>
								<div class="performance-item">
									<div class="performance-label">Propulsion efficiency increase: 20%-40%</div>
									<div class="performance-bar">
										<div class="performance-bar-fill orange-bar" style="width: 40%"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 右侧面板：水翼艇VS传统船舶 -->
					<div class="modal-right-panel">
						<!-- 标题区域 -->
						<div class="panel-header-section">
							<div class="panel-header">Hydrofoil vs Traditional Boat</div>
						</div>
						<!-- 内容区域 -->
						<div class="panel-content">
							<!-- 背景视频 -->
							<video ref="videoRef" class="panel-background-video" src="../assets/shuiyiting.mp4" muted
								loop playsinline @click="togglePlayPause"></video>
							<!-- 视频遮罩层 -->
							<!-- <div class="panel-video-overlay"></div> -->
							<!-- 视频控制按钮 -->
							<div class="video-controls">
								<button class="video-control-btn" @click="togglePlayPause"
									:title="isPlaying ? 'Pause' : 'Play'">
									<svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<svg v-else t="1762358387505" class="icon" viewBox="0 0 1024 1024" version="1.1"
										xmlns="http://www.w3.org/2000/svg" p-id="5203">
										<path
											d="M510.7 962.4c-60.7 0-119.5-11.9-175-35.3-53.5-22.6-101.6-55-142.9-96.3-41.3-41.3-73.7-89.3-96.3-142.9-23.4-55.4-35.3-114.3-35.3-175s11.9-119.5 35.3-175c22.6-53.5 55-101.6 96.3-142.9 41.3-41.3 89.3-73.7 142.9-96.3 55.4-23.4 114.3-35.3 175-35.3s119.5 11.9 175 35.3c53.5 22.6 101.6 55 142.9 96.3 41.3 41.3 73.7 89.3 96.3 142.9 23.4 55.4 35.3 114.3 35.3 175s-11.9 119.5-35.3 175c-22.6 53.5-55 101.6-96.3 142.9-41.3 41.3-89.3 73.7-142.9 96.3-55.5 23.4-114.3 35.3-175 35.3z m0-854.9c-223.5 0-405.4 181.9-405.4 405.4s181.9 405.4 405.4 405.4 405.4-181.9 405.4-405.4-181.9-405.4-405.4-405.4z"
											fill="#ffffff" p-id="5204"></path>
										<path d="M404.9 336.3v352.6l305.4-176.3z" fill="#ffffff" p-id="5205"></path>
									</svg>
								</button>
								<button class="video-control-btn" @click="toggleFullscreen" title="Fullscreen">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
										stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
									</svg>
								</button>
							</div>
							<!-- 视频右侧文案 -->
							<div class="video-text-labels">
								<div class="video-text-label">No waves</div>
								<div class="video-text-label">Slightly bumpy</div>
							</div>
							<!-- 内容 -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 右侧产品规格区域 -->
		<div class="right-section">
			<div class="absolute right-5 sm:right-10 md:right-12 lg:right-16 xl:right-20 2xl:right-[100px] top-[calc(84px+30px)] bottom-[30px] bg-[rgba(100,100,100,0.3)] backdrop-blur-[20px] rounded-[10px] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-auto min-w-fit max-w-[calc(100vw-40px)] sm:max-w-[calc(100vw-80px)] md:max-w-[calc(100vw-120px)] lg:max-w-[calc(100vw-160px)] xl:max-w-[calc(100vw-200px)] 2xl:max-w-[calc(100vw-300px)] flex flex-col overflow-hidden custom-scrollbar" ref="productSpecsPanelRef">
				<!-- <h3 class="specs-title">Ship name: YU</h3> -->
				<div class="w-full min-h-[48px] sm:min-h-[50px] md:min-h-[54px] lg:min-h-[56px] xl:min-h-[58px] bg-[#646464] rounded-t-[10px] flex items-center flex-shrink-0 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-[29px]">
					<span class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-[350] text-white leading-tight not-italic normal-case whitespace-nowrap">Model: YU</span>
				</div>
				<div class="flex-1 overflow-y-auto overflow-x-hidden pl-4 sm:pl-5 md:pl-6 lg:pl-7 xl:pl-[29px] pr-4 sm:pr-5 md:pr-6 lg:pr-7 xl:pr-[29px]">
				<!-- 主要尺寸 -->
				<div class="p-2">
					<div class="flex justify-between items-center cursor-pointer rounded-[5px]">
						<h4 class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal text-white">Principal dimension:</h4>
						<div class="text-white text-xs transition-transform duration-300 ease-in-out">▼</div>
					</div>
					<div class="flex flex-col gap-1.5">
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Total length</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">4.90 m</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Total width</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">3.40 m</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Draft</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">1.20 m</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Person capacity</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">3-5 people</span>
						</div>
					</div>
				</div>

				<!-- 动力、速度和续航 -->
				<div class="p-2">
					<div class="flex justify-between items-center cursor-pointer rounded-[5px]">
						<!-- <h4 class="spec-category">Power, speed, and range:</h4> -->
						<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal text-white">Power, speed, and range:</span>
						<div class="text-white text-xs transition-transform duration-300 ease-in-out">▼</div>
					</div>
					<div class="flex flex-col gap-1.5">
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Cruising speed</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">15/30 sections (kt)</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Maximum speed</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">18/35 sections(kt)</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Endurance</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">2.5 hours (standard operating conditions)</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Propulsion power</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">20kw/40 kw</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Charging method</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">Equipped with dedicated charging stations</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Charging station</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">380V 60A</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Charging time</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">1.5 hours</span>
						</div>
						<div class="flex justify-between items-start py-1 border-b border-white/10 last:border-b-0 gap-3 sm:gap-4">
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white whitespace-nowrap">Charging power</span>
							<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[18px] text-white font-semibold text-right whitespace-nowrap">≤20kw</span>
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
import { ref, onMounted, onUpdated, onUnmounted, nextTick } from 'vue'

const router = useRouter()

// 当前激活的导航项
const activeNavItem = ref<string | null>(null)

// 是否显示传统电动船舶痛点右侧内容
const showPainPointsContent = ref(false)

// 是否显示左侧导航菜单
const isNavMenuOpen = ref(false)

// 切换左侧导航菜单显示状态
const toggleNavMenu = () => {
	isNavMenuOpen.value = !isNavMenuOpen.value
}

// 导航项引用
const navListRef = ref<HTMLElement | null>(null)
const firstNavItemRef = ref<HTMLElement | null>(null)
const lastNavItemRef = ref<HTMLElement | null>(null)
const leftNavWrapperRef = ref<HTMLElement | null>(null)
const productSpecsPanelRef = ref<HTMLElement | null>(null)

// 左侧导航菜单高度
const leftNavHeight = ref<string>('auto')

// 连接线高度和位置
const lineHeight = ref('0px')
const lineTop = ref('0px')

// 同步左侧导航菜单高度到右侧产品规格区域
const syncLeftNavHeight = () => {
	nextTick(() => {
		if (productSpecsPanelRef.value) {
			const rightPanelHeight = productSpecsPanelRef.value.offsetHeight
			leftNavHeight.value = `${rightPanelHeight}px`
		}
	})
}

// 计算连接线的位置和高度
const updateLinePosition = () => {
	nextTick(() => {
		if (firstNavItemRef.value && lastNavItemRef.value && navListRef.value) {
			const firstRect = firstNavItemRef.value.getBoundingClientRect()
			const lastRect = lastNavItemRef.value.getBoundingClientRect()
			const listRect = navListRef.value.getBoundingClientRect()

			// 计算第一个导航项相对于列表容器的位置
			const firstTop = firstRect.top - listRect.top + firstRect.height / 2
			// 计算最后一个导航项相对于列表容器的位置
			const lastTop = lastRect.top - listRect.top + lastRect.height / 2

			// 连接线从第一个导航项的中心开始，到最后一个导航项的中心结束
			lineTop.value = `${firstTop}px`
			lineHeight.value = `${lastTop - firstTop}px`
		}
	})
}

// 导航到首页
const goHome = () => {
	router.push('/')
}

// 设置激活的导航项
const setActiveNavItem = (item: string) => {
	activeNavItem.value = activeNavItem.value === item ? null : item
}

// 关闭水翼艇优势弹窗
const closeAdvantagesModal = () => {
	activeNavItem.value = null
}

// 关闭传统电动船舶痛点弹窗
const closePainPointsModal = () => {
	activeNavItem.value = null
	showPainPointsContent.value = false
}

// 关闭竞品分析弹窗
const closeCompetitorAnalysisModal = () => {
	activeNavItem.value = null
}

const closeThreeModeRudderModal = () => {
	activeNavItem.value = null
}

// 驾驶模式切换
const drivingMode = ref('normal')
const toggleDrivingMode = () => {
	if (drivingMode.value === 'normal') {
		drivingMode.value = 'sport'
	} else if (drivingMode.value === 'sport') {
		drivingMode.value = 'automatic'
	} else {
		drivingMode.value = 'normal'
	}
}

// 竞品分析tab切换
const competitorTab = ref('vs-others')
const setCompetitorTab = (tab: string) => {
	competitorTab.value = tab
}

// 视频控制
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

const togglePlayPause = () => {
	if (videoRef.value) {
		if (videoRef.value.paused) {
			videoRef.value.play()
			isPlaying.value = true
		} else {
			videoRef.value.pause()
			isPlaying.value = false
		}
	}
}

const toggleFullscreen = () => {
	if (videoRef.value) {
		const panelContent = videoRef.value.closest('.panel-content')
		if (panelContent) {
			if (!document.fullscreenElement) {
				panelContent.requestFullscreen().catch(err => {
					console.log('Error attempting to enable fullscreen:', err)
				})
			} else {
				document.exitFullscreen()
			}
		}
	}
}

// 窗口大小变化处理函数
const handleResize = () => {
	updateLinePosition()
}

// 组件挂载后计算连接线位置
onMounted(() => {
	updateLinePosition()
	// 监听窗口大小变化
	window.addEventListener('resize', handleResize)

	// 监听视频播放状态
	if (videoRef.value) {
		videoRef.value.addEventListener('play', () => {
			isPlaying.value = true
		})
		videoRef.value.addEventListener('pause', () => {
			isPlaying.value = false
		})
	}
})

// 组件更新后重新计算
onUpdated(() => {
	updateLinePosition()
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
	window.removeEventListener('resize', handleResize)
})

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


/* 弹窗样式.start */
/* 右侧区域：传统船数据 */
.right-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 15px;
	box-shadow: 0 0 10px #646464;
}

/* 右侧产品规格面板 - 已改为 Tailwind CSS 类 */


/* 左侧悬浮按钮样式 */
.left-nav-toggle-btn {
	position: fixed;
	left: -24px;
	top: calc(84px + 30px);
	width: 48px;
	height: 48px;
	background: rgba(0, 212, 255, 0.2);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(0, 212, 255, 0.3);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 10001;
	transition: all 0.3s ease;
	color: #00d4ff;
	overflow: hidden;
}

.left-nav-toggle-btn:hover {
	background: rgba(0, 212, 255, 0.3);
	border-color: rgba(0, 212, 255, 0.5);
	transform: scale(1.1);
}

.left-nav-toggle-btn svg {
	width: 24px;
	height: 24px;
	margin-left: 12px;
}

/* 左侧导航菜单样式 */
.left-section {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 10;
	opacity: 0;
	visibility: hidden;
	transform: translateX(-100%);
	transition: all 0.3s ease;
}

.left-section.left-section-open {
	opacity: 1;
	visibility: visible;
	transform: translateX(0);
}

/* 左侧导航外框包裹 - 已改为 Tailwind CSS 类 */

/* 左侧导航船舶名称头部样式 */
.left-nav-ship-name-header {
	width: 100%;
	height: 58px;
	background: #646464;
	border-radius: 10px 10px 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.left-nav-specs-title {
	font-size: 20px;
	font-weight: 300;
	color: #FFFFFF;
	line-height: 20px;
	font-style: normal;
	text-transform: none;
}

@media (min-width: 640px) {
	.left-nav-specs-title {
		font-size: 22px;
	}
}

@media (min-width: 768px) {
	.left-nav-specs-title {
		font-size: 24px;
	}
}

@media (min-width: 1024px) {
	.left-nav-specs-title {
		font-size: 26px;
	}
}

@media (min-width: 1280px) {
	.left-nav-specs-title {
		font-size: 28px;
	}
}

@media (min-width: 1536px) {
	.left-nav-specs-title {
		font-size: 30px;
	}
}

.left-nav-list {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: flex-start;
	padding: 15px 20px 20px 20px;
}

@media (min-width: 640px) {
	.left-nav-list {
		gap: 25px;
		padding: 18px 25px 23px 25px;
	}
}

@media (min-width: 1024px) {
	.left-nav-list {
		gap: 30px;
		padding: 22px 32px 27px 32px;
	}
}

@media (min-width: 1280px) {
	.left-nav-list {
		gap: 35px;
		padding: 24px 36px 29px 36px;
	}
}

@media (min-width: 1536px) {
	.left-nav-list {
		gap: 40px;
		padding: 25px 40px 30px 40px;
	}
}

.left-nav-item {
	display: flex;
	align-items: center;
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.left-nav-item:last-child {
	border-bottom: none;
}

.left-nav-item:hover .nav-text {
	color: #00d4ff;
	transform: translateX(5px);
}

.left-nav-item.active .nav-text {
	color: #00d4ff;
}

.nav-text {
	font-size: 18px;
	font-weight: 500;
	color: #FFFFFF;
	transition: all 0.3s ease;
	white-space: nowrap;
}

@media (min-width: 640px) {
	.nav-text {
		font-size: 20px;
	}
}

@media (min-width: 768px) {
	.nav-text {
		font-size: 22px;
	}
}

@media (min-width: 1024px) {
	.nav-text {
		font-size: 24px;
	}
}

@media (min-width: 1280px) {
	.nav-text {
		font-size: 26px;
	}
}

@media (min-width: 1536px) {
	.nav-text {
		font-size: 30px;
	}
}

/* 颜色价格区域特殊样式 */
.color-price-section {
	gap: 15px;
}

.color-price-content {
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: 100%;
	align-items: center;
	margin-left: 80px;
}

.color-options {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px 20px;
	width: 100%;
	max-width: 260px;
	position: relative;
}

.color-swatch {
	width: 135px;
	height: 25px;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	pointer-events: auto;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	border: 2px solid rgba(255, 255, 255, 0.3);
}

.color-swatch:hover {
	transform: scale(1.1);
	border-color: #3CC8C8;
}

.color-swatch.active {
	border-color: #00d4ff;
	border-width: 3px;
	transform: scale(1.1);
	box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.purchase-btn {
	display: flex;
	align-items: center;
	gap: 10px;
	background: rgba(255, 255, 255, 0.8);
	margin-left: 300px;
	color: #000000;
	width: 353px;
	height: 69px;
	padding: 15px 25px;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.purchase-btn:hover {
	background: rgba(255, 255, 255, 1);
	transform: translateY(-2px);
}

.price-icon {
	width: 20px;
	height: 20px;
	object-fit: contain;
}

.purchase-text {
	font-size: 14px;
	color: #000000;
}

/* 市场调查弹窗样式 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(40, 40, 40, 0.6);
	backdrop-filter: blur(20px);
	z-index: 20000;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 0;
	margin: 0;
	overflow: hidden;
}

.market-research-modal {
	position: relative;
	width: 100%;
	max-width: 100%;
	height: 100vh;
	background: rgba(40, 40, 40, 0.95);
	backdrop-filter: blur(20px);
	border-radius: 0;
	border: none;
	box-shadow: none;
	overflow-y: auto;
	overflow-x: hidden;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
}

.modal-close-btn {
	position: absolute;
	top: 15px;
	right: 15px;
	width: 32px;
	height: 32px;
	min-width: 32px;
	min-height: 32px;
	max-width: 32px;
	max-height: 32px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 50% !important;
	color: #FFFFFF;
	font-size: 24px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	z-index: 10;
	line-height: 1;
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

.modal-close-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: scale(1.1);
	border-radius: 50% !important;
}

.modal-title {
	font-size: 16px;
	font-weight: 500;
	color: #FFFFFF;
	padding: 15px 20px 12px 20px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	flex-shrink: 0;
}

@media (min-width: 640px) {
	.modal-title {
		font-size: 18px;
		padding: 18px 30px 14px 30px;
	}
}

@media (min-width: 1024px) {
	.modal-title {
		font-size: 20px;
		padding: 20px 40px 15px 40px;
	}
}

@media (min-width: 1280px) {
	.modal-title {
		font-size: 22px;
	}
}

@media (min-width: 1536px) {
	.modal-title {
		font-size: 24px;
	}
}

.modal-content-wrapper {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 15px;
	padding: 15px 20px 20px 20px;
	flex: 1;
	min-height: 0;
	overflow-y: auto;
}

.modal-content-wrapper.three-mode-rudder-wrapper {
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: center;
	gap: 20px !important;
}

@media (min-width: 640px) {
	.modal-content-wrapper {
		gap: 20px;
		padding: 20px 30px 25px 30px;
	}
}

@media (min-width: 1024px) {
	.modal-content-wrapper {
		gap: 25px;
		padding: 23px 35px 28px 35px;
	}
}

@media (min-width: 1280px) {
	.modal-content-wrapper {
		gap: 30px;
		padding: 25px 40px 30px 40px;
	}
}

.modal-left-panel,
.modal-right-panel {
	display: flex;
	flex-direction: column;
	gap: 18px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	padding: 20px;
	position: relative;
	overflow: hidden;
}

.modal-right-panel {
	padding: 0;
	display: flex;
	flex-direction: column;
}

.panel-header-section {
	position: relative;
	z-index: 2;
	padding: 20px;
	background: rgba(255, 255, 255, 0.05);
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.pain-points-close-btn {
	width: 28px;
	height: 28px;
	min-width: 28px;
	min-height: 28px;
	max-width: 28px;
	max-height: 28px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 50% !important;
	color: #FFFFFF;
	font-size: 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	line-height: 1;
	box-sizing: border-box;
	padding: 0;
	margin: 0;
	flex-shrink: 0;
}

.pain-points-close-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: scale(1.1);
	border-radius: 50% !important;
}


.panel-content {
	position: relative;
	flex: 1;
	overflow: hidden;
	border-radius: 0 0 12px 12px;
}

.panel-background-video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: contain;
	object-position: center;
	z-index: 0;
}

.panel-video-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 1;
	pointer-events: none;
}

/* 视频右侧文案标签 */
.video-text-labels {
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	gap: 20px;
	z-index: 10;
	pointer-events: none;
}

.video-text-label {
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 8px;
	padding: 8px 16px;
	font-size: 14px;
	font-weight: 600;
	color: #FFFFFF;
	white-space: nowrap;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.video-controls {
	position: absolute;
	bottom: 20px;
	right: 20px;
	display: flex;
	gap: 12px;
	z-index: 10;
}

.video-control-btn {
	width: 44px;
	height: 44px;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	color: #ffffff;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	pointer-events: auto;
}

.video-control-btn:hover {
	background: rgba(0, 0, 0, 0.8);
	border-color: rgba(255, 255, 255, 0.5);
	transform: scale(1.1);
}

.video-control-btn svg {
	width: 20px;
	height: 20px;
}

.panel-content-inner {
	position: relative;
	z-index: 2;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 18px;
	min-height: 0;
	overflow-y: auto;
}

.panel-header {
	font-size: 14px;
	font-weight: 600;
	color: #FF6B35;
	padding: 8px 0;
	border-bottom: 2px solid #FF6B35;
}

@media (min-width: 640px) {
	.panel-header {
		font-size: 15px;
	}
}

@media (min-width: 1024px) {
	.panel-header {
		font-size: 16px;
	}
}

@media (min-width: 1280px) {
	.panel-header {
		font-size: 17px;
	}
}

@media (min-width: 1536px) {
	.panel-header {
		font-size: 18px;
	}
}

.panel-section {
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
}

.section-title {
	font-size: 12px;
	font-weight: 600;
	color: #FFFFFF;
	margin-bottom: 8px;
}

@media (min-width: 640px) {
	.section-title {
		font-size: 13px;
	}
}

@media (min-width: 1024px) {
	.section-title {
		font-size: 14px;
	}
}

@media (min-width: 1280px) {
	.section-title {
		font-size: 15px;
	}
}

@media (min-width: 1536px) {
	.section-title {
		font-size: 16px;
	}
}

.section-text {
	font-size: 11px;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.9);
	text-align: justify;
}

@media (min-width: 640px) {
	.section-text {
		font-size: 12px;
	}
}

@media (min-width: 1024px) {
	.section-text {
		font-size: 13px;
	}
}

.performance-list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.performance-item {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.performance-label {
	font-size: 11px;
	color: rgba(255, 255, 255, 0.9);
	font-weight: 500;
}

@media (min-width: 640px) {
	.performance-label {
		font-size: 12px;
	}
}

@media (min-width: 1024px) {
	.performance-label {
		font-size: 13px;
	}
}

.performance-bar {
	width: 100%;
	height: 20px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	overflow: hidden;
	position: relative;
}

.performance-bar-fill {
	height: 100%;
	border-radius: 4px;
	transition: width 0.6s ease;
}

.red-bar {
	background: linear-gradient(90deg, #FF4444, #FF6B35);
}

.orange-bar {
	background: linear-gradient(90deg, #FF6B35, #FF8C42);
}

/* 传统电动船舶痛点弹窗背景 */
.pain-points-modal {
	position: relative;
	overflow: hidden;
}

.pain-points-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	z-index: 0;
}

.pain-points-modal .modal-title,
.pain-points-modal .modal-content-wrapper,
.pain-points-modal .modal-close-btn {
	position: relative;
	z-index: 2;
}

.pain-points-content-wrapper {
	display: grid !important;
	grid-template-columns: 2fr 1fr !important;
	gap: 30px !important;
	padding-left: 40px !important;
}

.pain-points-left-panel {
	background: transparent !important;
	border: none !important;
	padding: 0 !important;
	position: relative;
}

.pain-points-trigger-btn-inner {
	background-color: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	padding: 20px 30px;
	cursor: pointer;
	color: #FFFFFF;
	font-size: 14px;
	font-weight: 500;
	text-align: center;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

@media (min-width: 640px) {
	.pain-points-trigger-btn-inner {
		padding: 30px 45px;
		font-size: 16px;
	}
}

@media (min-width: 1024px) {
	.pain-points-trigger-btn-inner {
		padding: 35px 50px;
		font-size: 18px;
	}
}

@media (min-width: 1536px) {
	.pain-points-trigger-btn-inner {
		padding: 40px 60px;
		font-size: 20px;
	}
}

.pain-points-trigger-btn-inner:hover {
	background-color: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.3);
}

.pain-points-content-wrapper .pain-points-right-panel {
	max-width: 600px !important;
	width: 600px !important;
	min-width: 600px !important;
	flex: 0 0 600px !important;
	flex-shrink: 0 !important;
	flex-grow: 0 !important;
	flex-basis: 600px !important;
	border: none !important;
	background: transparent !important;
	border-radius: 0 !important;
}

.pain-points-content-wrapper .pain-points-right-panel.pain-points-right-panel-expanded {
	background: rgba(255, 255, 255, 0.05) !important;
	backdrop-filter: blur(10px) !important;
	border: 1px solid rgba(255, 255, 255, 0.2) !important;
	border-radius: 12px !important;
}


/* 传统电动船舶痛点样式 */
.conclusion-title,
.comparison-title,
.solutions-title {
	font-size: 14px;
	font-weight: 700;
	color: #FFFFFF;
	margin-bottom: 15px;
}

@media (min-width: 640px) {
	.conclusion-title,
	.comparison-title,
	.solutions-title {
		font-size: 16px;
		margin-bottom: 18px;
	}
}

@media (min-width: 1024px) {
	.conclusion-title,
	.comparison-title,
	.solutions-title {
		font-size: 18px;
		margin-bottom: 20px;
	}
}

@media (min-width: 1536px) {
	.conclusion-title,
	.comparison-title,
	.solutions-title {
		font-size: 20px;
	}
}

.conclusion-content {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.conclusion-item {
	display: flex;
	align-items: flex-start;
	gap: 8px;
	font-size: 11px;
	line-height: 1.8;
	color: rgba(255, 255, 255, 0.9);
}

@media (min-width: 640px) {
	.conclusion-item {
		font-size: 12px;
	}
}

@media (min-width: 1024px) {
	.conclusion-item {
		font-size: 13px;
	}
}

@media (min-width: 1536px) {
	.conclusion-item {
		font-size: 14px;
	}
}

.conclusion-number {
	font-weight: 600;
	color: #FFFFFF;
	flex-shrink: 0;
}

.conclusion-text {
	flex: 1;
}

.comparison-bars {
	display: flex;
	flex-direction: column;
	gap: 18px;
}

.comparison-bar-item {
	width: 100%;
}

.comparison-bar {
	position: relative;
	width: 100%;
	height: 32px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	overflow: hidden;
}

.comparison-bar-fill {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background: linear-gradient(90deg, #FFD700, #FF6B35);
	border-radius: 4px;
	transition: width 0.6s ease;
}

.comparison-bar-text {
	position: absolute;
	left: 12px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 11px;
	font-weight: 600;
	color: #FFFFFF;
	z-index: 2;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@media (min-width: 640px) {
	.comparison-bar-text {
		font-size: 12px;
	}
}

@media (min-width: 1024px) {
	.comparison-bar-text {
		font-size: 13px;
	}
}

@media (min-width: 1536px) {
	.comparison-bar-text {
		font-size: 14px;
	}
}

.solutions-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 15px;
	width: 100%;
	max-width: 100%;
}

.solution-item {
	background: #FF4444;
	color: #FFFFFF;
	padding: 12px 16px;
	border-radius: 8px;
	font-size: 12px;
	font-weight: 500;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

@media (min-width: 640px) {
	.solution-item {
		font-size: 13px;
		padding: 13px 18px;
	}
}

@media (min-width: 1024px) {
	.solution-item {
		font-size: 14px;
		padding: 14px 19px;
	}
}

@media (min-width: 1536px) {
	.solution-item {
		font-size: 16px;
		padding: 15px 20px;
	}
}

.speed-section {
	text-align: center;
	padding: 12px 0;
}

.go-text {
	font-size: 36px;
	font-weight: bold;
	color: #FFFFFF;
	margin-bottom: 6px;
}

.speed-info {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.9);
	letter-spacing: 1px;
}

.boat-comparison {
	margin: 12px 0;
	min-height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.boat-image-container {
	position: relative;
	width: 100%;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}

.traditional-boat,
.hydrofoil-boat {
	width: 80%;
	height: 60px;
	background: rgba(100, 100, 100, 0.3);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.hydrofoil-boat {
	background: rgba(0, 150, 255, 0.3);
}

.boat-label {
	position: absolute;
	top: -20px;
	left: 10px;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.8);
}

.lift-indicator {
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 12px;
	font-weight: bold;
	color: #FF6B35;
}

.charts-section {
	display: flex;
	flex-direction: column;
	gap: 14px;
	margin-top: 12px;
}

.chart-container {
	background: rgba(30, 30, 30, 0.8);
	border-radius: 8px;
	padding: 12px;
}

.chart-title {
	font-size: 13px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.9);
	margin-bottom: 8px;
}

.chart-placeholder {
	width: 100%;
	height: 120px;
}

/* 竞品分析弹窗样式 */
.competitor-analysis-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px 20px;
	grid-template-columns: 1fr;
	gap: 15px;
}

@media (min-width: 640px) {
	.competitor-analysis-wrapper {
		padding: 20px 30px;
		gap: 20px;
	}
}

@media (min-width: 1024px) {
	.competitor-analysis-wrapper {
		padding: 25px 35px;
		gap: 23px;
	}
}

@media (min-width: 1280px) {
	.competitor-analysis-wrapper {
		padding: 28px 38px;
		gap: 24px;
	}
}

@media (min-width: 1536px) {
	.competitor-analysis-wrapper {
		padding: 30px 40px;
		gap: 25px;
	}
}

/* Tab切换样式 */
.competitor-tabs {
	display: flex;
	gap: 30px;
	width: 100%;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 25px;
}

.competitor-tab {
	background: transparent;
	border: none;
	padding: 8px 20px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.6);
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	border-bottom: 2px solid transparent;
	margin-bottom: -1px;
}

@media (min-width: 640px) {
	.competitor-tab {
		padding: 10px 40px;
	}
}

@media (min-width: 1024px) {
	.competitor-tab {
		padding: 12px 80px;
	}
}

@media (min-width: 1280px) {
	.competitor-tab {
		padding: 12px 100px;
	}
}

@media (min-width: 1536px) {
	.competitor-tab {
		padding: 12px 120px;
	}
}

.competitor-tab:hover {
	color: rgba(255, 255, 255, 0.8);
}

.competitor-tab.active {
	color: #FF6B35;
	border-bottom-color: #FF6B35;
}

.competitor-tab-content {
	width: 100%;
}

.tab-panel {
	width: 100%;
}

.tab-placeholder {
	text-align: center;
	padding: 60px 20px;
	color: rgba(255, 255, 255, 0.5);
	font-size: 16px;
}

.competitor-title {
	background: #FF6B35;
	color: #FFFFFF;
	padding: 12px 40px;
	border-radius: 12px;
	font-size: 18px;
	font-weight: 600;
	text-align: center;
	white-space: nowrap;
}

.competitor-grid {
	display: grid;
	grid-template-columns: 200px repeat(6, calc((100% - 200px) / 6));
	gap: 0;
	width: 100%;
	max-width: 100%;
	align-items: stretch;
	margin-left: 0;
	margin-bottom: 20px;
}

/* VS 其他水翼艇 tab的网格布局（5列） */
.tab-panel.vs-others-tab .competitor-grid {
	grid-template-columns: 200px 260px repeat(4, calc((100% - 200px - 260px) / 4));
}

/* 10-15w tab的网格布局（3列） */
.tab-panel.three-col-tab .competitor-grid {
	grid-template-columns: 200px 260px repeat(2, calc((100% - 200px - 260px) / 2));
}

/* 18w tab的网格布局（4列） */
.tab-panel.four-col-tab .competitor-grid {
	grid-template-columns: 200px 260px repeat(3, calc((100% - 200px - 260px) / 3));
}

.competitor-spacer {
	/* 空白占位符，与表格第一列对齐 */
	display: block;
}

.competitor-item {
	grid-column: span 1;
}

.competitor-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: transparent;
	border: none;
	border-radius: 0;
	padding: 0;
	transition: all 0.3s ease;
}

.competitor-item:hover {
	background: transparent;
	transform: none;
	box-shadow: none;
}

.competitor-image-wrapper {
	width: 200px;
	height: 150px;
	min-height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	overflow: hidden;
	padding: 10px;
	box-sizing: border-box;
	margin: 0 auto;
}

.competitor-item.yu-column .competitor-image-wrapper {
	width: 260px;
	height: 170px;
	min-height: 170px;
}

.competitor-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
	display: block;
}

.competitor-item.yu-column .competitor-image {
	object-fit: cover;
}

.competitor-image-wrapper video.competitor-image {
	object-fit: contain;
}

.competitor-item.yu-column .competitor-image-wrapper video.competitor-image {
	object-fit: cover;
}

.competitor-label {
	font-size: 18px;
	font-weight: 600;
	color: #FFFFFF;
	text-align: center;
}

@media (max-width: 1400px) {
	.competitor-grid {
		gap: 15px;
	}

	.competitor-image-wrapper {
		height: 150px;
		min-height: 150px;
	}

	.competitor-item {
		padding: 0;
	}
}

@media (max-width: 1024px) {
	.competitor-grid {
		grid-template-columns: repeat(5, 1fr);
		gap: 12px;
	}

	.competitor-image-wrapper {
		height: 150px;
		min-height: 150px;
	}

	.competitor-item {
		padding: 0;
	}
}

@media (max-width: 768px) {
	.competitor-grid {
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
	}

	.competitor-image-wrapper {
		height: 150px;
		min-height: 150px;
	}

	.competitor-item {
		padding: 0;
	}

	.competitor-analysis-wrapper {
		padding: 20px;
	}
}

/* 性能对比表格样式 */
.comparison-table-wrapper {
	width: 100%;
	max-width: 100%;
	overflow-x: auto;
	margin-top: 0;
	display: flex;
	justify-content: flex-start;
}

.comparison-table {
	width: 100%;
	border-collapse: collapse;
	background: rgba(60, 60, 60, 0.8);
	border-radius: 8px;
	overflow: hidden;
	table-layout: fixed;
}

/* 第一列（项目列）固定宽度，与网格第一列对齐 */
.comparison-table th:first-child,
.comparison-table td:first-child {
	width: 200px;
	box-sizing: border-box;
}

/* 统一非首列宽度（后续覆盖） */
.comparison-table th:not(:first-child),
.comparison-table td:not(:first-child) {
	box-sizing: border-box;
}

/* 御水翼艇列宽度 */
.comparison-table td.yu-column,
.comparison-table th.yu-column {
	width: 260px;
}

/* VS 其他水翼艇 tab的数据列宽（除御水翼艇列外共有4列） */
.tab-panel.vs-others-tab .comparison-table td:not(:first-child):not(.yu-column),
.tab-panel.vs-others-tab .comparison-table th:not(:first-child):not(.yu-column) {
	width: calc((100% - 200px - 260px) / 4);
}

/* 10-15w tab的数据列宽（除御水翼艇列外共有2列） */
.tab-panel.three-col-tab .comparison-table td:not(:first-child):not(.yu-column),
.tab-panel.three-col-tab .comparison-table th:not(:first-child):not(.yu-column) {
	width: calc((100% - 200px - 260px) / 2);
}

/* 18w tab的数据列宽（除御水翼艇列外共有3列） */
.tab-panel.four-col-tab .comparison-table td:not(:first-child):not(.yu-column),
.tab-panel.four-col-tab .comparison-table th:not(:first-child):not(.yu-column) {
	width: calc((100% - 200px - 260px) / 3);
}

.comparison-table thead {
	background: rgba(40, 40, 40, 0.9);
}

.comparison-table th {
	padding: 8px 10px;
	text-align: center;
	font-weight: 600;
	color: #FFFFFF;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (min-width: 640px) {
	.comparison-table th {
		padding: 9px 11px;
	}
}

@media (min-width: 1024px) {
	.comparison-table th {
		padding: 10px 12px;
	}
}

.comparison-table th:first-child {
	text-align: left;
	padding-left: 20px;
}

.comparison-table tbody tr {
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.comparison-table tbody tr:last-child {
	border-bottom: none;
}

.comparison-table td {
	padding: 6px 10px;
	text-align: center;
	color: rgba(255, 255, 255, 0.9);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 640px) {
	.comparison-table td {
		padding: 7px 11px;
	}
}

@media (min-width: 1024px) {
	.comparison-table td {
		padding: 8px 12px;
	}
}

.comparison-table td:first-child {
	text-align: left;
	padding-left: 20px;
	font-weight: 500;
	background: rgba(40, 40, 40, 0.5);
	color: #FFFFFF;
}

/* 突出显示我们的产品列 */
.comparison-table td.yu-column {
	background: rgba(0, 212, 255, 0.15) !important;
	border-left: 3px solid #00d4ff;
	border-right: 3px solid #00d4ff;
	position: relative;
}

.comparison-table td.yu-column:first-of-type {
	border-left: 3px solid #00d4ff;
}

.competitor-item.yu-column {
	position: relative;
}

.competitor-item.yu-column .competitor-image-wrapper {
	background: rgba(0, 212, 255, 0.2);
	border: 2px solid #00d4ff;
	box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
}

.comparison-table .stars {
	color: #FF6B35;
	font-size: 16px;
	letter-spacing: 2px;
}

@media (max-width: 1400px) {

	/* 考虑15px gap */
	.comparison-table th:not(:first-child),
	.comparison-table td:not(:first-child) {
		width: calc((100% - 180px - 4 * 15px) / 5);
	}
}

@media (max-width: 1024px) {

	.comparison-table th,
	.comparison-table td {
		padding: 8px 6px;
	}

	.comparison-table th:first-child,
	.comparison-table td:first-child {
		padding-left: 12px;
		min-width: 150px;
	}

	/* 考虑12px gap */
	.comparison-table th:not(:first-child),
	.comparison-table td:not(:first-child) {
		width: calc((100% - 150px) / 6);
	}

	.competitor-conclusion {
		padding: 15px 20px;
	}

	.competitor-conclusion .conclusion-title {
		margin-bottom: 12px;
	}
}

@media (max-width: 768px) {
	.comparison-table-wrapper {
		overflow-x: scroll;
	}

	.comparison-table {
		min-width: 800px;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 6px 4px;
		font-size: 10px;
	}

	.comparison-table th:first-child,
	.comparison-table td:first-child {
		min-width: 120px;
		padding-left: 10px;
	}

	/* 考虑8px gap */
	.comparison-table th:not(:first-child),
	.comparison-table td:not(:first-child) {
		width: calc((100% - 120px) / 6);
	}

	.competitor-conclusion {
		padding: 12px 15px;
	}

	.competitor-conclusion .conclusion-title {
		margin-bottom: 10px;
	}
}

.chart-svg {
	width: 100%;
	height: 100%;
}

/* 竞品分析结论样式 */
.competitor-conclusion {
	width: 100%;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	padding: 20px 25px;
	margin-top: 30px;
}

.competitor-conclusion .conclusion-title {
	font-weight: 700;
	color: #FFFFFF;
	margin-bottom: 12px;
}

@media (min-width: 640px) {
	.competitor-conclusion .conclusion-title {
		margin-bottom: 13px;
	}
}

@media (min-width: 1024px) {
	.competitor-conclusion .conclusion-title {
		margin-bottom: 14px;
	}
}

@media (min-width: 1280px) {
	.competitor-conclusion .conclusion-title {
		margin-bottom: 15px;
	}
}

.competitor-conclusion .conclusion-content {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.competitor-conclusion .conclusion-item {
	display: flex;
	align-items: flex-start;
	gap: 10px;
	line-height: 1.6;
}

.competitor-conclusion .conclusion-bullet {
	color: #FF6B35;
	font-size: 14px;
	font-weight: bold;
	flex-shrink: 0;
	line-height: 1.4;
}

@media (min-width: 640px) {
	.competitor-conclusion .conclusion-bullet {
		font-size: 15px;
	}
}

@media (min-width: 1024px) {
	.competitor-conclusion .conclusion-bullet {
		font-size: 16px;
	}
}

@media (min-width: 1280px) {
	.competitor-conclusion .conclusion-bullet {
		font-size: 17px;
	}
}

@media (min-width: 1536px) {
	.competitor-conclusion .conclusion-bullet {
		font-size: 18px;
	}
}

.competitor-conclusion .conclusion-text {
	color: rgba(255, 255, 255, 0.9);
	flex: 1;
	line-height: 1.6;
}

@media (max-width: 1024px) {
	.modal-content-wrapper {
		grid-template-columns: 1fr;
		gap: 20px;
		padding: 20px 30px 25px 30px;
	}

	.modal-title {
		font-size: 20px;
		padding: 15px 30px 12px 30px;
	}

	.panel-header {
		font-size: 16px;
	}

	.section-title {
		font-size: 14px;
	}

	.section-text {
		font-size: 12px;
	}
}

/* 响应式设计 */
@media (max-width: 768px) {
	.main-content {
		flex-direction: column;
	}

	.nav-container {
		flex-wrap: wrap;
		gap: 10px;
	}

	.nav-item {
		font-size: 12px;
		padding: 8px 15px;
	}

	.left-section,
	.right-section {
		padding: 20px;
	}

	.product-specs-panel {
		max-width: 100%;
	}
}

/* 弹窗样式.end */

/* 智能控制三模方向舵样式 */
.three-mode-rudder-wrapper {
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 20px;
	padding: 20px;
	align-items: center;
	flex: 1;
	min-height: 0;
}

@media (max-width: 1024px) {
	.three-mode-rudder-wrapper {
		grid-template-columns: 1fr;
		gap: 20px;
		min-height: auto;
	}
}

.three-mode-left-panel {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.steering-wheel-container {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.steering-wheel-image-wrapper {
	width: 100%;
	max-width: 600px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.steering-wheel-image {
	width: 100%;
	height: auto;
	object-fit: contain;
	border-radius: 12px;
}

.placeholder-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
}

.placeholder-text {
	font-size: 18px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.6);
}

.placeholder-subtext {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.4);
}

.feature-labels {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
}

.feature-label {
	position: absolute;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
}

.feature-label[style*="right"] {
	transform: translate(50%, -50%);
	align-items: flex-end;
}

.label-line {
	width: 2px;
	height: 60px;
	background: rgba(255, 255, 255, 0.5);
}

.label-text {
	font-size: 12px;
	font-weight: 500;
	color: #FFFFFF;
	white-space: nowrap;
	padding: 4px 8px;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 4px;
}

.three-mode-right-panel {
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: stretch;
	justify-content: center;
	height: 100%;
	position: relative;
	left: -200px;
}

.mode-switch-buttons {
	display: flex;
	gap: 10px;
	justify-content: center;
}

.mode-switch-btn {
	padding: 10px 20px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 6px;
	color: rgba(255, 255, 255, 0.7);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
}

.mode-switch-btn:hover {
	background: rgba(255, 255, 255, 0.15);
	border-color: rgba(255, 255, 255, 0.5);
	color: rgba(255, 255, 255, 0.9);
}

.mode-switch-btn.active {
	background: rgba(255, 107, 53, 0.9);
	border-color: rgba(255, 107, 53, 1);
	color: #FFFFFF;
}

.driving-mode-box {
	background: rgba(255, 107, 53, 0.9);
	border-radius: 8px;
	padding: 20px;
	text-align: center;
}

.driving-mode-title {
	font-size: 20px;
	font-weight: 700;
	color: #FFFFFF;
	margin-bottom: 8px;
}

.driving-mode-subtitle {
	font-size: 14px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.9);
}

.interior-view-wrapper {
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.interior-view-image {
	width: 100%;
	height: auto;
	object-fit: contain;
	border-radius: 12px;
}

/* 自定义滚动条样式 - 更不显眼 */
.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
	height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.15);
	border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.25);
}

.custom-scrollbar::-webkit-scrollbar-corner {
	background: transparent;
}

/* Firefox scrollbar styles */
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.05);
}
</style>
