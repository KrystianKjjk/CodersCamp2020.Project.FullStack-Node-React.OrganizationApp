import React, { useEffect } from 'react'
import { UserType } from '../../models/User.model'
import { getUserFromLocalStorage } from '../../app/utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../pages/Common/HomePage/HomePageSlice'
import { selectMenu } from './MenuSlice'
import MenuAdmin from './MenuAdmin'
import { setMenu, clearMenu } from './MenuSlice'
import debounce from 'lodash.debounce'
import MenuParticipant from './MenuParticipant'
import MenuMentor from './MenuMentor'

export const WIDTH_SMALL_MENU_ON_PX = 900
export const DEBOUNCE_RESIZE_MS = 100

export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const dispatch = useDispatch()

  const {
    userData: { name, surname },
  } = useSelector(selectUserData)
  const { showSmallMenu, showSmallMenuUserAction } = useSelector(selectMenu)

  const { userType } = getUserFromLocalStorage()

  useEffect(() => {
    showSmallMenuUserAction ? dispatch(setMenu()) : dispatch(clearMenu())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSmallMenuUserAction])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const handleResize = debounce(() => {
    if (window.innerWidth <= WIDTH_SMALL_MENU_ON_PX) {
      dispatch(setMenu())
    } else {
      if (!showSmallMenuUserAction) dispatch(clearMenu())
    }
  }, DEBOUNCE_RESIZE_MS)

  //@ts-ignore
  switch (parseInt(userType)) {
    case UserType.Admin:
      return (
        <MenuAdmin name={name} surname={surname} smallMenu={showSmallMenu} />
      )
    case UserType.Mentor:
      return (
        <MenuMentor name={name} surname={surname} smallMenu={showSmallMenu} />
      )
    default:
      return (
        <MenuParticipant
          name={name}
          surname={surname}
          smallMenu={showSmallMenu}
        />
      )
  }
}

export default Menu
