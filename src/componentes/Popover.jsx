import { Popover, OverlayTrigger } from 'react-bootstrap';
const PopoverComponent = (props) => {
    const popover = (
        <Popover id="climate-popover" className={`bg-${props.alert}`}>
            <Popover.Header as="h3">{props.header}</Popover.Header>
            <Popover.Body className="text-white" style={{textAlign:'justify'}}>{props.text}</Popover.Body>
        </Popover>
    );
    const tipo = props.tipo
    return (
        <div>
            <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popover}>{tipo}
            </OverlayTrigger>
        </div>
    );
}
export default PopoverComponent;