requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function cutIntoSquaresVisualization(tgt_node, data) {

            if (!data || !data.ext) {
                return
            }

            const [w, h] = data.in

            /**
             * 
             * attr
             * 
             */
            const attr = {
                grid: {
                    inner: {
                        'stroke-width': '0.2',
                        'stroke': '#2080B8',
                    },
                    outer: {
                        'stroke-width': '0.5',
                        'stroke': '#000000',
                    },
                },
                edge_length: {
                    'font-family': 'times',
                    'font-weight': 'bold',
                    'font-size': '10',
                    'fill': '#294270',
                    'stroke': 'none',
                },
                arrow: {
                    'stroke-width': '0.5',
                    'stroke': '#2080B8',
                    'arrow-end': 'block-wide-long',
                    'arrow-start': 'block-wide-long',
                },
            }

            /**
             * 
             * values
             * 
             */
            const grid_size_px = 200
            const os = 20
            const unit = grid_size_px / Math.max(w, h)

            /**
             * 
             * paper
             * 
             */
            const paper = Raphael(tgt_node, unit * w + os * 2, unit * h + os * 2)

            /**
             * 
             * draw grid
             * 
             */

            /** horizontal */
            for (let i = 0; i <= h; i += 1) {
                paper.path(['M', os, i * unit + os, 'h', unit * w]).attr(attr.grid.inner)
            }

            /** vertical */
            for (let j = 0; j <= w; j += 1) {
                paper.path(['M', j * unit + os, os, 'v', unit * h]).attr(attr.grid.inner)
            }
            /** outer flame */
            paper.rect(os, os, unit * w, unit * h).attr(attr.grid.outer)

            /**
             * 
             * draw edge length
             * 
             */
            paper.path(['M', os, os/2, 'h', unit*w]).attr(attr.arrow)
            paper.path(['M', os/2, os, 'v', unit*h]).attr(attr.arrow)
            paper.text(os+unit*(w/2), os/2, w).attr(attr.edge_length)
            paper.text(os/2, os+unit*(h/2), h).attr(attr.edge_length)

            /**
             * 
             * draw squares
             * 
             */
            if (!data.ext.explanation) {
                return
            }
            const squares = data.ext.explanation
            squares.forEach((ex) => {
                if (ex.length == 3) {
                    let [x, y, edge] = ex
                    paper.rect(unit * x + os, unit * y + os, unit * edge, unit * edge).attr(attr.grid.outer)
                } else {
                    let [x, y, direction, edge] = ex
                    paper.path(['M', unit * x + os, unit * y + os, direction, unit * edge]).attr(attr.outer)
                }
            })
        }
        var io = new extIO({
            animation: function ($expl, data) {
                cutIntoSquaresVisualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
