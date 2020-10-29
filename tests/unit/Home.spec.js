import { shallowMount } from '@vue/test-utils'
import Home from '../../src/views/Home.vue'
import Locations from '../../src/components/Locations.vue'

describe('Home.vue', () => {
    let wrapper = null

    beforeEach(()=>{
        wrapper = shallowMount(Home)
    })
    afterEach(()=>{
        wrapper.destroy()
    })

    //Home loads
    it('displays location component initially', async () => {

        expect(wrapper.vm.currentTabComponent).toEqual('Locations')

        expect(wrapper.find('.component').vm.$options.name).toEqual('Locations')

    })

})

