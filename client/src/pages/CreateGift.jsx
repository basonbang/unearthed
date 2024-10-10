import { useState } from 'react'
import './CreateGift.css'

const CreateGift = () => {

    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate = year + '-' + month + '-' + day

    const [gift, setGift] = useState({
        id: 0, name: '',
        pricepoint: '',
        audience: '',
        image: '',
        description: '',
        submittedby: '',
        submittedon: currentDate
    })
    
    const handleChange = (event) => {
      // destructure name and value properties from input element
      // name -> identifies the specific input 
      // value -> the value within the input
        const { name, value } = event.target

        setGift( (prev) => {
            return {
                ...prev,        // spread operator to create new copy of previous state of gift object
                [name]:value,   // dynamically update whichever property to it's new value
            }
        })
    }
    
    const createGift = (event) => {
        event.preventDefault()
        // HTTP request to create a new gift
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(gift)
        }
        const response = fetch('/gifts', options)
        window.location = '/'
    }

    return (
        <div className='CreateGift'>
            <center><h2>Add a Gift</h2></center>
            <form>
                <label>Name</label> <br />
                <input type='text' id='name' name='name' value={gift.name} onChange={handleChange} /><br />
                <br/>

                <label>Description</label><br />
                <textarea rows='5' cols='50' id='description' name='description' value={gift.description} onChange={handleChange} ></textarea>
                <br/>

                <label>Image URL</label><br />
                <input type='text' id='image' name='image' value={gift.image} onChange={handleChange} /><br />
                <br/>

                <label>Price Point</label><br />
                <input type='text' id='pricepoint' name='pricepoint' value={gift.pricepoint} onChange={handleChange} /><br />
                <br/>

                <label>Audience</label><br />
                <input type='text' id='audience' name='audience' value={gift.audience} onChange={handleChange} /><br />
                <br/>

                <label>Submitted By</label><br />
                <input type='text' id='submittedby' name='submittedby' value={gift.submittedby} onChange={handleChange} /><br />
                <br/>

                <input type='submit' value='Submit' onClick={createGift} />
            </form>
        </div>
    )
}

export default CreateGift