import { shallowMount , createLocalVue} from '@vue/test-utils'
import Characters from '../../src/components/Characters.vue'
import axios from 'axios'
import State from '../../src/store/index'
const localVue = createLocalVue()
import Vuex from 'vuex'
import store from '../../src/store/index'
import { CardPlugin } from 'bootstrap-vue'
localVue.use(CardPlugin)

import { BPagination,BBadge, BCard,BCardTitle, BCardSubTitle,BCardText, BButton } from 'bootstrap-vue'
localVue.use(CardPlugin)
localVue.use(Vuex)

jest.mock('axios')
const mockedCharacters = [
    {
        gender: "Female",
        id: 38,
        image: "https://rickandmortyapi.com/api/character/avatar/38.jpeg",
        name: "Beth Smith",
        species: "Human",
        status: "Alive",
        type: "",
        url: "https://rickandmortyapi.com/api/character/38"
    },
    {
        gender: "Male",
        id: 40,
        image: "https://rickandmortyapi.com/api/character/avatar/40.jpeg",
        name: "Ben Affleck",
        species: "Alien",
        status: "Dead",
        type: "",
        url: "https://rickandmortyapi.com/api/character/40"
    }
]

describe('Characters.vue', () => {
    let wrapper = null
    const responseGet = { data: mockedCharacters }

    beforeAll(()=>{
        axios.get.mockResolvedValue(responseGet)
        wrapper = shallowMount(Characters, {
            store,
            localVue,
            propsData: {
                ids: '2'
            }
        })
    })
    afterAll(()=>{
        jest.resetModules()
        jest.clearAllMocks()
        wrapper.destroy()
    })

    //Test props
    it('tests props received', () => {
        expect(wrapper.vm.ids).toEqual('2')
    })

    //Api loads
    it('displays initial API Fetch',  () => {

    /*    expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith('https://rickandmortyapi.com/api/character/'+wrapper.vm.ids);

        await wrapper.vm.$nextTick()
        expect(wrapper.findAllComponents(BCard).length).toEqual(mockedCharacters.length)

        //Display data correctly in all components
        for (let i =0;i<mockedCharacters.length;i++){
            const c = mockedCharacters[i]
            expect(wrapper.findAllComponents(BCard).at(i).findComponent(BCardTitle).attributes('title')).toEqual(c.name)
            expect(wrapper.findAllComponents(BCard).at(i).findComponent(BCardSubTitle).text()).toBe(`${c.species} | ${c.gender}`)
            expect(wrapper.findAllComponents(BCard).at(i).findComponent(BCardText).findComponent(BBadge).text()).toEqual(c.status)
            //todo: test style of above elements

        }*/

    })

})

