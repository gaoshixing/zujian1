export default {
    functional: true,
    props: {
        render: Function,
        column: Object,
        index: Number,
        row: Object,
        parent: Object,
    },
    render: (h, ctx) => {
        const params = {
            column: ctx.props.column,
            index: ctx.props.index,
            row: ctx.props.row
        };
        return ctx.props.render(h, params,ctx.parent);
    }
};