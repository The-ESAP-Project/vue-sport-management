<template>
  <div class="space-y-6">
    <!-- 页面头部 -->
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">数据填报</h1>
      <p class="mt-1 text-sm text-gray-600">
        请填写您的体测数据信息
      </p>
    </div>

    <!-- 填报表单 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">体测数据表单</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- 基本信息 -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              姓名 <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="请输入姓名"
            />
          </div>

          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">
              性别 <span class="text-red-500">*</span>
            </label>
            <select
              id="gender"
              v-model="form.gender"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">请选择性别</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>

          <div>
            <label for="age" class="block text-sm font-medium text-gray-700 mb-1">
              年龄 <span class="text-red-500">*</span>
            </label>
            <input
              id="age"
              v-model.number="form.age"
              type="number"
              min="1"
              max="120"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="请输入年龄"
            />
          </div>

          <div>
            <label for="studentId" class="block text-sm font-medium text-gray-700 mb-1">
              学号/工号 <span class="text-red-500">*</span>
            </label>
            <input
              id="studentId"
              v-model="form.studentId"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="请输入学号或工号"
            />
          </div>
        </div>

        <!-- 体测项目 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">体测项目</h3>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label for="height" class="block text-sm font-medium text-gray-700 mb-1">
                身高 (cm) <span class="text-red-500">*</span>
              </label>
              <input
                id="height"
                v-model.number="form.height"
                type="number"
                step="0.1"
                min="0"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入身高"
              />
            </div>

            <div>
              <label for="weight" class="block text-sm font-medium text-gray-700 mb-1">
                体重 (kg) <span class="text-red-500">*</span>
              </label>
              <input
                id="weight"
                v-model.number="form.weight"
                type="number"
                step="0.1"
                min="0"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入体重"
              />
            </div>

            <div>
              <label for="bmi" class="block text-sm font-medium text-gray-700 mb-1">
                BMI
              </label>
              <input
                id="bmi"
                :value="calculatedBMI"
                type="text"
                readonly
                class="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                placeholder="自动计算"
              />
            </div>

            <div>
              <label for="vitalCapacity" class="block text-sm font-medium text-gray-700 mb-1">
                肺活量 (ml) <span class="text-red-500">*</span>
              </label>
              <input
                id="vitalCapacity"
                v-model.number="form.vitalCapacity"
                type="number"
                min="0"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入肺活量"
              />
            </div>

            <div>
              <label for="run50m" class="block text-sm font-medium text-gray-700 mb-1">
                50米跑 (秒) <span class="text-red-500">*</span>
              </label>
              <input
                id="run50m"
                v-model.number="form.run50m"
                type="number"
                step="0.01"
                min="0"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入50米跑成绩"
              />
            </div>

            <div>
              <label for="sitUp" class="block text-sm font-medium text-gray-700 mb-1">
                仰卧起坐 (个/分钟) <span class="text-red-500">*</span>
              </label>
              <input
                id="sitUp"
                v-model.number="form.sitUp"
                type="number"
                min="0"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入仰卧起坐次数"
              />
            </div>

            <div>
              <label for="sitReach" class="block text-sm font-medium text-gray-700 mb-1">
                坐位体前屈 (cm) <span class="text-red-500">*</span>
              </label>
              <input
                id="sitReach"
                v-model.number="form.sitReach"
                type="number"
                step="0.1"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入坐位体前屈成绩"
              />
            </div>

            <div>
              <label for="pullUp" class="block text-sm font-medium text-gray-700 mb-1">
                引体向上 (个) <span class="text-red-500">*</span>
              </label>
              <input
                id="pullUp"
                v-model.number="form.pullUp"
                type="number"
                min="0"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="请输入引体向上次数"
              />
            </div>

            <div>
              <label for="run1000m" class="block text-sm font-medium text-gray-700 mb-1">
                1000米跑 (分:秒) <span class="text-red-500">*</span>
              </label>
              <input
                id="run1000m"
                v-model="form.run1000m"
                type="text"
                pattern="^[0-9]+:[0-9]{2}$"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="例如: 3:45"
              />
            </div>
          </div>
        </div>

        <!-- 备注 -->
        <div>
          <label for="remark" class="block text-sm font-medium text-gray-700 mb-1">
            备注
          </label>
          <textarea
            id="remark"
            v-model="form.remark"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="可填写特殊情况说明..."
          />
        </div>

        <!-- 提交按钮 -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="resetForm"
              class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              重置
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {{ submitting ? '提交中...' : '提交数据' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const submitting = ref(false)

const form = reactive({
  name: '',
  gender: '',
  age: null as number | null,
  studentId: '',
  height: null as number | null,
  weight: null as number | null,
  vitalCapacity: null as number | null,
  run50m: null as number | null,
  sitUp: null as number | null,
  sitReach: null as number | null,
  pullUp: null as number | null,
  run1000m: '',
  remark: ''
})

const calculatedBMI = computed(() => {
  if (form.height && form.weight) {
    const heightInMeters = form.height / 100
    const bmi = form.weight / (heightInMeters * heightInMeters)
    return bmi.toFixed(2)
  }
  return ''
})

async function handleSubmit() {
  submitting.value = true

  try {
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 这里应该调用API提交数据
    console.log('提交数据:', form)

    alert('数据提交成功！')
    resetForm()
  } catch {
    alert('提交失败，请重试')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  Object.assign(form, {
    name: '',
    gender: '',
    age: null,
    studentId: '',
    height: null,
    weight: null,
    vitalCapacity: null,
    run50m: null,
    sitUp: null,
    sitReach: null,
    pullUp: null,
    run1000m: '',
    remark: ''
  })
}
</script>
