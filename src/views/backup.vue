<script setup>
// 导入自定义组件
import SummaryCard from '../components/SummaryCard.vue';
import MapMarker from '../components/MapMarker.vue';

// 定义组件属性
defineProps(['style']);
</script>

<template>
  <!-- 页面根容器 - 深蓝色背景，全屏高度，垂直布局 -->
  <div>
      <!-- 主要内容区域 - 固定宽高，水平布局，包含左侧导航和右侧内容 -->
      <div>
        <!-- 左侧导航栏 - 包含菜单图标和导航指示器 -->
        <div>
          <!-- 菜单图标按钮 -->
          <div>
            <div>
              <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607743708/b850/4e75/8cd7/0e2e9eb24ec15b138986e0bcd093b323.png" />
            </div>
          </div>
          <!-- 行业背景图标 -->
          <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607744725/01ba/48c3/ad6b/284052aa6d7b0048403adcb66aed80d4.png" />
          <!-- 导航指示器 - 白色圆点 -->
          <div></div>
          <div></div>
          <div></div>
      </div>
      <!-- 右侧内容区域 - 包含数据图表、地图和详细信息 -->
      <div>
        <!-- 数据展示区域开始 -->

        <!-- 全球小型游艇制造业标题和图表 -->
        <div></div>
        <div>
          <span> Global small yacht manufacturing industry </span>
          <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607742561/3fc5/11cf/d855/b15bba1346a12538dd8e4e6f4149c0a2.png" />
        </div>

        <!-- 高亮边框装饰 -->
        <div></div>

        <!-- 分隔线 -->
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>

        <!-- 页面主标题 -->
        <span> Industry Background - Global </span>
        <!-- 数据图表区块 -->

        <!-- 水上户外运动设备市场规模图表 -->
        <div>
          <span> Global market size of water outdoor sports equipment<br />(growth rate) </span>
          <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607745205/ce52/284e/5ac2/98278fa50c12bf7ed0d679ac7628b6cc.png" />
        </div>

        <!-- 全球船舶租赁市场规模图表 -->
        <div>
          <span> Global ship leasing market size </span>
          <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607742607/2648/1f2d/f3e8/9a265345a4b57fdc83009fe4e1268a90.png" />
        </div>
        <!-- 导航菜单区域 -->

        <!-- 导航链接 -->
        <span> Industry Background </span>
        <div></div>
        <span> Market Demand </span>
        <div></div>
        <span> Business Model </span>

        <!-- 导航指示点 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- 更多数据图表 -->

        <!-- 全球小型游艇销售市场规模图表 -->
        <div>
          <span> Global small yacht sales market size </span>
          <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607742575/1755/4aaf/63db/12bbee782d57faa62ce3f8cd8eec4858.png" />
        </div>

        <!-- 水上户外运动设备市场规模图表（重复展示） -->
        <div>
          <span> Global market size of water outdoor sports equipment </span>
          <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607744762/9f35/a3ad/bfa9/78473f85205e728f3c695a130d55a08d.png" />
        </div>
        <!-- 全球船主年龄结构分析 -->
        <div>
          <span> Age structure of global shipowners </span>

          <!-- 主要年龄段图表（35-50岁） -->
          <div>
            <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607746016/f501/eb83/1ac2/58bdab36ba6976f7ab274bcac7cf6252.png" />
            <div></div>
            <span> 35 - 50 </span>
          </div>

          <!-- 其他年龄段分布 -->
          <div>
            <img src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607742652/8f47/c37d/1214/03851dd2606040f9eb1b38ffd93f045f.png" /><span> 18 - 34 </span>
            <div></div>
            <span> 51 - 65 </span>
            <div></div>
            <span> ≧ 65 </span>
          </div>
        </div>
        <!-- 团队构成导航 -->
        <div></div>
        <span> Team Composition </span>
        <div></div>
        <!-- 世界地图展示区域 -->
        <div>

          <!-- 摘要卡片组件 -->
          <SummaryCard />

          <!-- 地区数据标记区域 -->
          <div>
            <!-- 中国地区标记 -->
            <div>
              <div>
                <div></div>
                <span> China </span>
              </div>
              <MapMarker />
            </div>

            <!-- 东南亚地区标记 -->
            <div>
              <div>
                <span> Southeast Asia </span>
              </div>
              <MapMarker />
            </div>

            <!-- 意大利地区标记 -->
            <div>
              <div>
                <div></div>
                <span> Italian </span>
              </div>
              <MapMarker />
            </div>

            <!-- 美国地区标记 -->
            <div>
              <div></div>
              <span> America<br /><br /><br /><br /> </span>
              <MapMarker />
            </div>

            <!-- 中东地区标记 -->
            <div>
              <div></div>
              <span> Middle East </span>
              <MapMarker />
            </div>
          </div>

          <!-- 图表类型选择按钮 -->
          <div>
            <span> Bar chart </span>
          </div>
          <div>
            <span> Flying wire </span>
          </div>
          <div>
            <span> Point </span>
          </div>
        </div>
        <!-- 产品介绍导航和装饰图片 -->
        <span>
          Product Introduction
          <div></div> </span
        ><img
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62607744566/13b1/ed3c/34e9/5ec5b34ba97ec22fa03e6a42d0cfa4d0.png" />
      </div>
    </div>
  </div>
</template>
