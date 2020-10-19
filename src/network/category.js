import { request } from "./request";

export function getCategory() {
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    pramas: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}