<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export interface RepairShop {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  phone?: string
  website?: string
  categories: string[]
  description?: string
}

interface Props {
  shops: RepairShop[]
  center?: [number, number]
  zoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  center: () => [40.4168, -3.7038], // Madrid
  zoom: 6
})

const emit = defineEmits<{
  (e: 'select', shop: RepairShop): void
}>()

const selectedShop = ref<RepairShop | null>(null)

const handleMarkerClick = (shop: RepairShop) => {
  selectedShop.value = shop
  emit('select', shop)
}

const getCategoryColor = (categories: string[]) => {
  if (categories.includes('electronica')) return '#0d9488'
  if (categories.includes('electrodomesticos')) return '#0891b2'
  if (categories.includes('ropa')) return '#7c3aed'
  if (categories.includes('movilidad')) return '#f97316'
  return '#6b7280'
}
</script>

<template>
  <div class="h-full w-full min-h-[400px]">
    <LMap
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      class="h-full w-full rounded-lg"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        layer-type="base"
        name="OpenStreetMap"
      />

      <LMarker
        v-for="shop in shops"
        :key="shop.id"
        :lat-lng="[shop.lat, shop.lng]"
        @click="handleMarkerClick(shop)"
      >
        <LPopup>
          <div class="min-w-[200px]">
            <h3 class="font-semibold text-gray-900">{{ shop.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ shop.address }}</p>
            <p class="text-sm text-gray-600">{{ shop.city }}</p>

            <div class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="cat in shop.categories"
                :key="cat"
                class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
              >
                {{ cat }}
              </span>
            </div>

            <div v-if="shop.phone || shop.website" class="mt-3 pt-2 border-t border-gray-100 space-y-1">
              <a
                v-if="shop.phone"
                :href="`tel:${shop.phone}`"
                class="text-sm text-primary-600 hover:underline flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {{ shop.phone }}
              </a>
              <a
                v-if="shop.website"
                :href="shop.website"
                target="_blank"
                rel="noopener"
                class="text-sm text-primary-600 hover:underline flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                Sitio web
              </a>
            </div>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>
