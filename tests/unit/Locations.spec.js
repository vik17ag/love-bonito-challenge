import { shallowMount , createLocalVue} from '@vue/test-utils'
import Locations from '../../src/components/Locations.vue'
import axios from 'axios'
import State from '../../src/store/index'
const localVue = createLocalVue()
import Vuex from 'vuex'
import store from '../../src/store/index'
import { CardPlugin } from 'bootstrap-vue'
localVue.use(CardPlugin)

import { BPagination, BCard,BCardTitle, BCardSubTitle,BCardText, BButton } from 'bootstrap-vue'
localVue.use(CardPlugin)
localVue.use(Vuex)

jest.mock('axios')
const mockedLocations = [
    {
        created: "2017-11-10T12:42:04.162Z",
        dimension: "Dimension C-137",
        id: 1,
        name: "Earth (C-137)",
        residents: [
            "https://rickandmortyapi.com/api/character/38",
            "https://rickandmortyapi.com/api/character/39",
            "https://rickandmortyapi.com/api/character/40"
        ],
        type: "Planet"
    },
    {
        created: "2017-11-10T12:42:04.162Z",
        dimension: "Dimension C-137",
        id: 1,
        name: "Moon (C-137)",
        residents: [],
        type: "Planet1"
    }
]

describe('Locations.vue', () => {
    let wrapper = null
    const responseGet = { data:
            {
                info: {
                    count: 108,
                    next: "https://rickandmortyapi.com/api/location?page=2",
                    pages: 6,
                    prev: null
                },
                results: mockedLocations
            }
    }

    beforeEach(()=>{
        axios.get.mockResolvedValue(responseGet)
        wrapper = shallowMount(Locations, {
            store,
            localVue
        })
    })
    afterEach(()=>{
        jest.resetModules()
        jest.clearAllMocks()
        wrapper.destroy()
    })

    //App loads
    it('displays initial API Fetch', async () => {

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith('https://rickandmortyapi.com/api/location?page=1');

        await wrapper.vm.$nextTick()
        expect(wrapper.findAllComponents(BCard).length).toEqual(mockedLocations.length)

        expect(wrapper.vm.rows).toBe(108)
        expect(wrapper.vm.locations).toBe(mockedLocations)

        //Display data correctly in all components
        for (let i =0;i<mockedLocations.length;i++){
            expect(wrapper.findAllComponents(BCard).at(i).findComponent(BCardTitle).attributes('title')).toEqual(mockedLocations[i].name)
            expect(wrapper.findAllComponents(BCard).at(i).findComponent(BCardSubTitle).text()).toEqual(mockedLocations[i].dimension)
            expect(wrapper.findAllComponents(BCard).at(i).findComponent(BCardText).text()).toEqual(mockedLocations[i].type)

        }

    })

    it('tests when clicked on a location',async () => {

        expect(wrapper.findAllComponents(BCard).length).toEqual(mockedLocations.length)

        await wrapper.findAllComponents(BCard).at(0).find('button').trigger('click')
        expect(wrapper.emitted().openCharacter).toEqual([["38,39,40"]]);

    })

    it('tests page changes in pagination', async ()=>{
        const mockedLocations2 = [
            {
                created: "2017-11-10T12:42:04.162Z",
                dimension: "Dimension C-137",
                id: 1,
                name: "Earth (C-137)",
                residents: [],
                type: "Planet"
            },
            {
                created: "2017-11-10T12:42:04.162Z",
                dimension: "Dimension C-137",
                id: 1,
                name: "Moon (C-137)",
                residents: [],
                type: "Planet1"
            },
            {
                created: "2017-11-10T12:42:04.162Z",
                dimension: "Dimension C-137",
                id: 1,
                name: "Earth (C-137)",
                residents: [],
                type: "Planet2"
            },
            {
                created: "2017-11-10T12:42:04.162Z",
                dimension: "Dimension C-137",
                id: 1,
                name: "Moon (C-137)",
                residents: [],
                type: "Planet3"
            }
        ]
        const responseGet2 = { data:
                {
                    info: {
                        count: 108,
                        next: "https://rickandmortyapi.com/api/location?page=2",
                        pages: 6,
                        prev: null
                    },
                    results: mockedLocations2
                }
        }

        axios.get.mockResolvedValue(responseGet2)

        //todo: test click event on pagination
        //await wrapper.findComponent(BPagination).trigger('change', {page: 2})
        wrapper.vm.$emit('openCharacter',2)
        expect(wrapper.vm.page).toEqual(1)
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith('https://rickandmortyapi.com/api/location?page=1');
        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents(BCard).length).toEqual(mockedLocations.length)


    })

})

