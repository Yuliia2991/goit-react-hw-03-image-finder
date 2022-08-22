import { RotatingLines  } from 'react-loader-spinner';
import css from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={css.Loading} >
            <RotatingLines  strokeColor="#e79de1"/>
        </div>
    )
}
