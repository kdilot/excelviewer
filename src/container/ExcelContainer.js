import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as excelActions from 'modules/excel';
import { FileLayout, JsonViewLayout, TableLayout, Title } from 'component';

class ExcelContainer extends Component {
  dataChange = async (data) => {
    const { ExcelAction } = this.props
    try {
      await ExcelAction.setChange(data)
    } catch (e) {
      console.log(e)
    }
  }
  tableChange = async (data, sheet) => {
    if (data) {
      const { ExcelAction } = this.props
      try {
        await ExcelAction.setTableChange({ data, sheet })
      } catch (e) {
        console.log(e)
      }
    }
  }
  fileChange = async (data) => {
    const { ExcelAction } = this.props
    try {
      await ExcelAction.setFlag()
      await setTimeout(
        () => {
          ExcelAction.getExcelData(data)
        }, 300)
    } catch (e) {
      console.log(e)
    }
  }
  // componentDidMount() {
  //   this.dataChange('test')
  // }

  constructor(props) {
    super(props)

    this.state = {
      dataChange: this.dataChange,
      tableChange: this.tableChange,
      fileChange: this.fileChange
    }
  }

  render() {
    const {
      data,
      flag
    } = this.props.excel
    const {
      dataChange,
      tableChange,
      fileChange
    } = this.state
    return (
      <div>
        <Title data={<h1>Excel Viwer</h1>} />
        <Title data={<h5>* Only support English to download </h5>} />
        <FileLayout data={data} fileChange={fileChange} />
        {flag ?
          <Title data={<h2>Loading</h2>} />
          :
          <>
            <Title data={<h3>Excel Sheet</h3>} />
            <TableLayout flag={flag} data={data} dataChange={dataChange} tableChange={tableChange} />
            <Title data={<h3>JSON Data</h3>} />
            <JsonViewLayout flag={flag} data={data} dataChange={dataChange} />
          </>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    excel: state.excel
  }),
  (dispatch) => ({
    ExcelAction: bindActionCreators(excelActions, dispatch)
  })
)(ExcelContainer);