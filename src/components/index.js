import ListAddButton from './list-add-button'

const list = [
  ListAddButton
]

export default function (Vue) {
  list.forEach((component) => {
    Vue.component(component.name, component)
  })
}
