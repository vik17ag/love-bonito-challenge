import { shallowMount , createLocalVue} from '@vue/test-utils'
import Character from '../../src/views/Character.vue'
import axios from 'axios'
import State from '../../src/store/index'
const localVue = createLocalVue()
import Vuex from 'vuex'
import store from '../../src/store/index'
import { CardPlugin } from 'bootstrap-vue'
localVue.use(CardPlugin)

import { BBadge, BCard,BCardBody, BCardSubTitle,BCardText } from 'bootstrap-vue'
localVue.use(CardPlugin)
localVue.use(Vuex)

jest.mock('axios')
const mockedCharacter = {
    gender: "Female",
    id: 38,
    image: "https://rickandmortyapi.com/api/character/avatar/38.jpeg",
    name: "Beth Smith",
    species: "Human",
    status: "Alive",
    type: "",
    url: "https://rickandmortyapi.com/api/character/38",
    location : {
        name: 'Earth'
    },
    origin : {
        name: 'Jupiter'
    }
}
const $route = {
    path: '/character',
    params: {
        id: '70'
    }
}

describe('Character.vue', () => {
    let wrapper = null
    const responseGet = { data: mockedCharacter }

    beforeAll(()=>{
        axios.get.mockResolvedValue(responseGet)
        wrapper = shallowMount(Character, {
            store,
            localVue,
            mocks: {
                $route
            }
        })
    })
    afterAll(()=>{
        jest.resetModules()
        jest.clearAllMocks()
        wrapper.destroy()
    })

    //Test props
    it('tests character id received from router params', () => {
        expect(wrapper.vm.$route.params.id).toEqual('70')
    })

    //Api loads
    it('displays character on initial API Fetch', async () => {

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith('https://rickandmortyapi.com/api/character/'+wrapper.vm.$route.params.id);

        await wrapper.vm.$nextTick()

        //Display data correctly in all components
            const c = mockedCharacter
            expect(wrapper.findComponent(BCard).findComponent(BCardBody).attributes('title')).toEqual(c.name)
            expect(wrapper.findComponent(BCard).findComponent(BCardSubTitle).text()).toBe(`${c.species} | ${c.gender}`)
            expect(wrapper.findComponent(BCard).findComponent(BCardText).findComponent(BBadge).text()).toEqual(c.status)
            //todo: test style of above elements


    })
})

