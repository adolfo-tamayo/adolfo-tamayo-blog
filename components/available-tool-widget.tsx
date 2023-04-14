
type AvailableToolWidgetProps = {
    name: string,
    description: string,
    link: string
}

const AvailableToolWidget = ({name, description, link}: AvailableToolWidgetProps) => {
    // Renders a widget for each available tool, looks like a card, with a max width of 400px
    return (
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{name}</div>
                <p className='text-gray-700 text-base'>
                    {description}
                </p>
            </div>
            <div className='px-6 py-4'>
                <a href={link} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Go</a>
            </div>
        </div>
    )
}
export default AvailableToolWidget